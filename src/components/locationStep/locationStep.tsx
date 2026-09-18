import {
    Button,
    Input,
    SelectPicker,
} from 'rsuite';
import {
    MdArrowBack,
    MdArrowForward,
    MdLocationOn,
} from 'react-icons/md';
import './locationStep.scss';

export interface SiteLocationForm {
    latitude: string;
    longitude: string;
    country: string | null;
    state: string | null;
    municipality: string;
    metroArea: string;
    address: string;
    references: string;
}

interface SelectOption {
    label: string;
    value: string;
}

interface LocationStepProps {
    value: SiteLocationForm;
    onChange: (value: SiteLocationForm) => void;
    onPrevious: () => void;
    onNext: () => void;
}

const countryOptions: SelectOption[] = [
    {
        label: 'México',
        value: 'MX',
    },
];

const stateOptions: SelectOption[] = [
    {
        label: 'Aguascalientes',
        value: 'Aguascalientes',
    },
    {
        label: 'Baja California',
        value: 'Baja California',
    },
    {
        label: 'Ciudad de México',
        value: 'Ciudad de México',
    },
    {
        label: 'Guanajuato',
        value: 'Guanajuato',
    },
    {
        label: 'Jalisco',
        value: 'Jalisco',
    },
    {
        label: 'Nuevo León',
        value: 'Nuevo León',
    },
    {
        label: 'Querétaro',
        value: 'Querétaro',
    },
    {
        label: 'Puebla',
        value: 'Puebla',
    },
];

export default function LocationStep({
     value,
     onChange,
     onPrevious,
     onNext,
 }: LocationStepProps) {
    const updateField = <K extends keyof SiteLocationForm, >(
        field: K,
        fieldValue: SiteLocationForm[K],
    ) => {
        onChange({
            ...value,
            [field]: fieldValue,
        });
    };

    const canContinue = value.address.trim() !== '';

    return (
        <div className="location-step">
            <div className="location-step__header">
                <div className="location-step__header-icon">
                    <MdLocationOn
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className="location-step__title">
                        Ubicación
                    </h2>

                    <p className="location-step__description">
                        Ingresa la dirección y localización
                        geográfica del sitio.
                    </p>
                </div>
            </div>

            <div className="location-step__fields">
                <div className="location-step__field">
                    <label className="location-step__label">
                        País
                    </label>

                    <SelectPicker
                        block
                        searchable
                        cleanable
                        data={countryOptions}
                        value={value.country}
                        placeholder="Selecciona un país"
                        onChange={(newValue) =>
                            updateField(
                                'country',
                                newValue ?? null,
                            )
                        }
                    />

                    <span className="location-step__help">
                        País donde se encuentra el sitio.
                    </span>
                </div>

                <div className="location-step__field">
                    <label className="location-step__label">
                        Estado
                    </label>

                    <SelectPicker
                        block
                        searchable
                        cleanable
                        data={stateOptions}
                        value={value.state}
                        placeholder="Selecciona un estado"
                        onChange={(newValue) =>
                            updateField(
                                'state',
                                newValue ?? null,
                            )
                        }
                    />

                    <span className="location-step__help">
                        Estado o entidad federativa.
                    </span>
                </div>

                <div className="location-step__field">
                    <label
                        className="location-step__label"
                        htmlFor="site-municipality"
                    >
                        Municipio
                    </label>

                    <Input
                        id="site-municipality"
                        value={value.municipality}
                        placeholder="Ej. Guadalajara"
                        onChange={(newValue) =>
                            updateField(
                                'municipality',
                                String(newValue),
                            )
                        }
                    />

                    <span className="location-step__help">
                        Municipio o alcaldía.
                    </span>
                </div>

                <div className="location-step__field">
                    <label
                        className="location-step__label"
                        htmlFor="site-metro-area"
                    >
                        Área metropolitana
                    </label>

                    <Input
                        id="site-metro-area"
                        value={value.metroArea}
                        placeholder="Ej. Guadalajara"
                        onChange={(newValue) =>
                            updateField(
                                'metroArea',
                                String(newValue),
                            )
                        }
                    />

                    <span className="location-step__help">
                        Zona metropolitana correspondiente.
                    </span>
                </div>

                <div className="location-step__field">
                    <label
                        className="location-step__label"
                        htmlFor="site-latitude"
                    >
                        Latitud
                    </label>

                    <Input
                        id="site-latitude"
                        value={value.latitude}
                        placeholder="Ej. 20.6736"
                        onChange={(newValue) =>
                            updateField(
                                'latitude',
                                String(newValue),
                            )
                        }
                    />

                    <span className="location-step__help">
                        Coordenada geográfica.
                    </span>
                </div>

                <div className="location-step__field">
                    <label
                        className="location-step__label"
                        htmlFor="site-longitude"
                    >
                        Longitud
                    </label>

                    <Input
                        id="site-longitude"
                        value={value.longitude}
                        placeholder="Ej. -103.3440"
                        onChange={(newValue) =>
                            updateField(
                                'longitude',
                                String(newValue),
                            )
                        }
                    />

                    <span className="location-step__help">
                        Coordenada geográfica.
                    </span>
                </div>
            </div>

            <div className="location-step__field location-step__field--full">
                <label
                    className="location-step__label"
                    htmlFor="site-address"
                >
                    Dirección, calle y número
                    <span aria-hidden="true"> *</span>
                </label>

                <Input
                    id="site-address"
                    value={value.address}
                    placeholder="Ej. Av. Vallarta 1500"
                    onChange={(newValue) =>
                        updateField(
                            'address',
                            String(newValue),
                        )
                    }
                />

                <span className="location-step__help">
                    Calle y número donde se encuentra
                    físicamente el sitio.
                </span>
            </div>

            <div className="location-step__field location-step__field--full">
                <label
                    className="location-step__label"
                    htmlFor="site-references"
                >
                    Referencias
                </label>

                <Input
                    id="site-references"
                    as="textarea"
                    rows={3}
                    value={value.references}
                    placeholder="Ej. Frente a Plaza..., esquina con..."
                    onChange={(newValue) =>
                        updateField(
                            'references',
                            String(newValue),
                        )
                    }
                />

                <span className="location-step__help">
                    Agrega información que facilite la
                    localización del sitio.
                </span>
            </div>

            <div className="location-step__actions">
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
                    disabled={!canContinue}
                    endIcon={
                        <MdArrowForward
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    onClick={onNext}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}