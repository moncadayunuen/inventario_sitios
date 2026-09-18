import {
    Button,
} from 'rsuite';
import {
    MdArrowBack,
    MdCheckCircle,
    MdDescription,
    MdLocationOn,
    MdViewInAr,
    MdCampaign,
} from 'react-icons/md';
import './reviewStep.scss';
import type {SiteIdentificationForm} from "../identificationStep/identificationStep.tsx";
import type {SiteLocationForm} from "../locationStep/locationStep.tsx";
import type {SiteStructureForm} from "../structureStep/structureStep.tsx";
import type {SiteCommercialForm} from "../commercialStep/commercialStep.tsx";

interface ReviewStepProps {
    identification: SiteIdentificationForm;
    location: SiteLocationForm;
    structure: SiteStructureForm;
    commercial: SiteCommercialForm;
    ownerName: string;
    isEditing?: boolean;
    onPrevious: () => void;
    onSubmit: () => void;
}

const getValue = (
    value: string | number | null | undefined,
) => {
    if (
        value === null ||
        value === undefined ||
        value === ''
    ) {
        return '-';
    }

    return String(value);
};

const structureTypeLabels: Record<string, string> = {
    billboard: 'Espectacular',
    wall: 'Muro',
    mupi: 'MUPI',
    'bus-shelter': 'Parabús',
    digital: 'Digital',
};

const lightingLabels: Record<string, string> = {
    none: 'Sin iluminación',
    front: 'Iluminación frontal',
    back: 'Iluminación posterior',
    internal: 'Iluminación interna',
};

const adTypeLabels: Record<string, string> = {
    static: 'Estático',
    digital: 'Digital',
};

export default function ReviewStep({
   identification,
   location,
   structure,
   commercial,
   ownerName,
   isEditing = false,
   onPrevious,
   onSubmit,
}: ReviewStepProps) {
    return (
        <div className="review-step">
            <div className="review-step__header">
                <div className="review-step__header-icon">
                    <MdCheckCircle
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className="review-step__title">
                        Revisión
                    </h2>

                    <p className="review-step__description">
                        Verifica que la información sea
                        correcta antes de registrar el sitio.
                    </p>
                </div>
            </div>

            <div className="review-step__sections">
                <section className="review-step__section">
                    <div className="review-step__section-header">
                        <MdDescription
                            size={18}
                            aria-hidden="true"
                        />

                        <h3>Identificación</h3>
                    </div>

                    <dl className="review-step__data">
                        <div>
                            <dt>ID del sitio</dt>
                            <dd>
                                {getValue(
                                    identification.id,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Nombre</dt>
                            <dd>
                                {getValue(
                                    identification.name,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Propietario</dt>
                            <dd>
                                {getValue(ownerName)}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="review-step__section">
                    <div className="review-step__section-header">
                        <MdLocationOn
                            size={18}
                            aria-hidden="true"
                        />

                        <h3>Ubicación</h3>
                    </div>

                    <dl className="review-step__data">
                        <div>
                            <dt>País</dt>
                            <dd>
                                {location.country === 'MX'
                                    ? 'México'
                                    : getValue(
                                        location.country,
                                    )}
                            </dd>
                        </div>

                        <div>
                            <dt>Estado</dt>
                            <dd>
                                {getValue(
                                    location.state,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Municipio</dt>
                            <dd>
                                {getValue(
                                    location.municipality,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Área metropolitana</dt>
                            <dd>
                                {getValue(
                                    location.metroArea,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Latitud</dt>
                            <dd>
                                {getValue(
                                    location.latitude,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Longitud</dt>
                            <dd>
                                {getValue(
                                    location.longitude,
                                )}
                            </dd>
                        </div>

                        <div className="review-step__data-full">
                            <dt>Dirección</dt>
                            <dd>
                                {getValue(
                                    location.address,
                                )}
                            </dd>
                        </div>

                        <div className="review-step__data-full">
                            <dt>Referencias</dt>
                            <dd>
                                {getValue(
                                    location.references,
                                )}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="review-step__section">
                    <div className="review-step__section-header">
                        <MdViewInAr
                            size={18}
                            aria-hidden="true"
                        />

                        <h3>Estructura</h3>
                    </div>

                    <dl className="review-step__data">
                        <div>
                            <dt>Tipo de estructura</dt>
                            <dd>
                                {structure.structureType
                                    ? structureTypeLabels[
                                        structure
                                            .structureType
                                        ] ??
                                    structure.structureType
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Número de caras</dt>
                            <dd>
                                {getValue(
                                    structure.faces,
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt>Iluminación</dt>
                            <dd>
                                {structure.lighting
                                    ? lightingLabels[
                                        structure.lighting
                                        ] ??
                                    structure.lighting
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Alto</dt>
                            <dd>
                                {structure.height !== null
                                    ? `${structure.height} m`
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Largo</dt>
                            <dd>
                                {structure.length !== null
                                    ? `${structure.length} m`
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Diámetro</dt>
                            <dd>
                                {structure.diameter !== null
                                    ? `${structure.diameter} m`
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>
                                Orientación de calle
                            </dt>
                            <dd>
                                {structure
                                    .hasStreetOrientation
                                    ? 'Sí'
                                    : 'No'}
                            </dd>
                        </div>

                        <div>
                            <dt>
                                Sentido / orientación
                            </dt>
                            <dd>
                                {structure
                                    .hasStreetOrientation
                                    ? getValue(
                                        structure
                                            .streetOrientation,
                                    )
                                    : '-'}
                            </dd>
                        </div>

                        <div className="review-step__data-full">
                            <dt>
                                Bloqueo de visibilidad
                            </dt>
                            <dd>
                                {getValue(
                                    structure
                                        .visibilityBlockage,
                                )}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="review-step__section">
                    <div className="review-step__section-header">
                        <MdCampaign
                            size={18}
                            aria-hidden="true"
                        />

                        <h3>Comercial</h3>
                    </div>

                    <dl className="review-step__data">
                        <div>
                            <dt>Tipo de anuncio</dt>
                            <dd>
                                {commercial.adType
                                    ? adTypeLabels[
                                        commercial.adType
                                        ] ??
                                    commercial.adType
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Duración por spot</dt>
                            <dd>
                                {commercial
                                    .spotDurationSeconds !==
                                null
                                    ? `${commercial.spotDurationSeconds} seg`
                                    : '-'}
                            </dd>
                        </div>

                        <div>
                            <dt>Spots por hora</dt>
                            <dd>
                                {getValue(
                                    commercial.spotsPerHour,
                                )}
                            </dd>
                        </div>
                    </dl>
                </section>
            </div>

            <div className="review-step__notice">
                <MdCheckCircle
                    size={20}
                    aria-hidden="true"
                />

                <div>
                    <strong>
                        Todo listo para registrar
                    </strong>

                    <span>
                        Revisa la información antes de
                        continuar. Podrás editar el sitio
                        posteriormente desde el inventario.
                    </span>
                </div>
            </div>

            <div className="review-step__actions">
                <Button
                    appearance="ghost"
                    type="button"
                    startIcon={
                        <MdArrowBack
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    onClick={onPrevious}
                >
                    Anterior
                </Button>

                <Button
                    appearance="primary"
                    type="button"
                    startIcon={
                        <MdCheckCircle
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    onClick={onSubmit}
                >
                    {isEditing
                        ? 'Guardar cambios'
                        : 'Registrar sitio'
                    }
                </Button>
            </div>
        </div>
    );
}