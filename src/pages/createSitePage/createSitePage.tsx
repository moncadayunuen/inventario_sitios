import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './createSitePage.scss';
import Breadcrumb from "../../components/breadcrumb/breadcrumb.tsx";
import PageHeader from "../../components/pageHeader/pageHeader.tsx";
import IdentificationStep, {type SiteIdentificationForm} from "../../components/identificationStep/identificationStep.tsx";
import LocationStep, {type SiteLocationForm} from "../../components/locationStep/locationStep.tsx";
import StructureStep, {type SiteStructureForm} from "../../components/structureStep/structureStep.tsx";
import CommercialStep, {type SiteCommercialForm} from "../../components/commercialStep/commercialStep.tsx";
import ReviewStep from "../../components/reviewStep/reviewStep.tsx";

type CreateSiteStep =
    | 'identification'
    | 'location'
    | 'structure'
    | 'commercial'
    | 'review';

interface Step {
    id: CreateSiteStep;
    number: number;
    label: string;
    description: string;
}

const STEPS: Step[] = [
    {
        id: 'identification',
        number: 1,
        label: 'Identificación',
        description: 'Datos generales',
    },
    {
        id: 'location',
        number: 2,
        label: 'Ubicación',
        description: 'Dirección y localización',
    },
    {
        id: 'structure',
        number: 3,
        label: 'Estructura',
        description: 'Características físicas',
    },
    {
        id: 'commercial',
        number: 4,
        label: 'Comercial',
        description: 'Información de renta',
    },
    {
        id: 'review',
        number: 5,
        label: 'Revisión',
        description: 'Confirmación y envío',
    },
];

export default function CreateSitePage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<CreateSiteStep>('identification');
    const { id } = useParams<{ id: string; }>();
    const isEditing = Boolean(id);
    const [identification, setIdentification] = useState<SiteIdentificationForm>({
        id: '',
        name: '',
        ownerId: null,
        images: [],
    });
    const [location, setLocation] = useState<SiteLocationForm>({
        latitude: '',
        longitude: '',
        country: 'MX',
        state: null,
        municipality: '',
        metroArea: '',
        address: '',
        references: '',
    });
    const [structure, setStructure] = useState<SiteStructureForm>({
        structureType: null,
        faces: null,
        height: null,
        length: null,
        diameter: null,
        lighting: null,
        hasStreetOrientation: false,
        streetOrientation: '',
        visibilityBlockage: '',
    });
    const [commercial, setCommercial] = useState<SiteCommercialForm>({
        adType: null,
        spotDurationSeconds: null,
        spotsPerHour: null,
    });

    const ownerOptions = [
        {
            label: 'OOH Metropolitano',
            value: 'owner-1',
        },
        {
            label: 'Grupo Vallas del Norte',
            value: 'owner-2',
        },
        {
            label: 'Red Exterior Bajío',
            value: 'owner-3',
        },
        {
            label: 'Espacios Urbanos',
            value: 'owner-4',
        },
        {
            label: 'Publimedios Occidente',
            value: 'owner-5',
        },
    ];

    const currentStepIndex = STEPS.findIndex(
        (step) => step.id === currentStep,
    );

    const selectedOwner = ownerOptions.find((owner) => owner.value === identification.ownerId,)?.label ?? '-';

    const handleCancel = () => {
        navigate('/inventory');
    };

    const handleNext = () => {
        const nextStep = STEPS[currentStepIndex + 1];

        if (!nextStep) {
            return;
        }

        setCurrentStep(nextStep.id);
    };

    const handlePrevious = () => {
        const previousStep = STEPS[currentStepIndex - 1];
        if (!previousStep) return;
        setCurrentStep(previousStep.id);
    };

    const handleSubmit = () => {
        const newSite = {
            identification,
            location,
            structure,
            commercial,
        };

        console.log('Nuevo sitio:', newSite,);
        navigate('/inventory');
    };

    return (
        <div className="create-site">
            <Breadcrumb
                items={[
                    {
                        label: 'Inventario',
                        onClick: () => navigate('/inventory'),
                    },
                    {
                        label: 'Sitios publicitarios',
                        onClick: () => navigate('/inventory'),
                    },
                    {
                        label: isEditing
                            ? 'Editar sitio'
                            : 'Nuevo sitio',
                    },
                ]}
            />

            <PageHeader
                title={isEditing ? 'Editar sitio' : 'Nuevo sitio'}
                description={isEditing ? 'Actualiza la información del sitio publicitario.' : 'Registra un nuevo sitio publicitario en la plataforma.'}
            />

            <nav
                className="create-site__stepper"
                aria-label="Progreso de registro"
            >
                {STEPS.map((step) => {
                    const stepIndex = STEPS.findIndex(
                        (item) => item.id === step.id,
                    );

                    const isActive = step.id === currentStep;

                    const isCompleted = stepIndex < currentStepIndex;

                    return (
                        <button
                            key={step.id}
                            type="button"
                            className={[
                                'create-site__step',
                                isActive ? 'create-site__step--active' : '',
                                isCompleted ? 'create-site__step--completed' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <span className="create-site__step-number">
                                {step.number}
                            </span>

                            <span className="create-site__step-content">
                                <span className="create-site__step-label">
                                    {step.label}
                                </span>

                                <span className="create-site__step-description">
                                    {step.description}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="create-site__layout">
                <main className="create-site__content">
                    {currentStep === 'identification' && (
                        <IdentificationStep
                            value={identification}
                            ownerOptions={ownerOptions}
                            onChange={setIdentification}
                            onCancel={handleCancel}
                            onNext={handleNext}
                        />
                    )}
                    {currentStep === 'location' && (
                        <LocationStep
                            value={location}
                            onChange={setLocation}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    )}
                    {currentStep === 'structure' && (
                        <StructureStep
                            value={structure}
                            onChange={setStructure}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    )}
                    {currentStep === 'commercial' && (
                        <CommercialStep
                            value={commercial}
                            onChange={setCommercial}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    )}
                    {currentStep === 'review' && (
                        <ReviewStep
                            identification={identification}
                            location={location}
                            structure={structure}
                            commercial={commercial}
                            ownerName={selectedOwner}
                            onPrevious={handlePrevious}
                            onSubmit={handleSubmit}
                            isEditing={isEditing}
                        />
                    )}
                </main>

                <aside className="create-site__sidebar">
                    <section className="create-site__sidebar-card">
                        <h2 className="create-site__sidebar-title">Vista previa</h2>

                        <div className="create-site__preview">
                            Sin contenido
                        </div>

                        <div className="create-site__preview-info">
                            La vista previa se actualizará conforme completes la información del sitio.
                        </div>
                    </section>

                    <section className="create-site__sidebar-card">
                        <h2 className="create-site__sidebar-title">Resumen</h2>
                        <dl className="create-site__summary">
                            <div className="create-site__summary-row">
                                <dt>ID</dt>
                                <dd>
                                    {identification.id || '-'}
                                </dd>
                            </div>

                            <div className="create-site__summary-row">
                                <dt>Nombre</dt>
                                <dd>
                                    {identification.name || '-'}
                                </dd>
                            </div>

                            <div className="create-site__summary-row">
                                <dt>Dueño</dt>
                                <dd>
                                    {selectedOwner}
                                </dd>
                            </div>
                        </dl>
                    </section>
                </aside>
            </div>
        </div>
    );
}