import {
    Button,
    Input,
    InputNumber,
    SelectPicker,
    Toggle,
} from 'rsuite';

import {
    MdArrowBack,
    MdArrowForward,
    MdViewInAr,
} from 'react-icons/md';

import './structureStep.scss';

export interface SiteStructureForm {
    structureType: string | null;
    faces: number | null;
    height: number | null;
    length: number | null;
    diameter: number | null;
    lighting: string | null;
    hasStreetOrientation: boolean;
    streetOrientation: string;
    visibilityBlockage: string;
}

interface StructureStepProps {
    value: SiteStructureForm;
    onChange: (value: SiteStructureForm) => void;
    onPrevious: () => void;
    onNext: () => void;
}

const structureTypeOptions = [
    {
        label: 'Espectacular',
        value: 'billboard',
    },
    {
        label: 'Muro',
        value: 'wall',
    },
    {
        label: 'MUPI',
        value: 'mupi',
    },
    {
        label: 'Parabús',
        value: 'bus-shelter',
    },
    {
        label: 'Digital',
        value: 'digital',
    },
];

const lightingOptions = [
    {
        label: 'Sin iluminación',
        value: 'none',
    },
    {
        label: 'Iluminación frontal',
        value: 'front',
    },
    {
        label: 'Iluminación posterior',
        value: 'back',
    },
    {
        label: 'Iluminación interna',
        value: 'internal',
    },
];

export default function StructureStep({
                                          value,
                                          onChange,
                                          onPrevious,
                                          onNext,
                                      }: StructureStepProps) {
    const updateField = <
        K extends keyof SiteStructureForm,
    >(
        field: K,
        fieldValue: SiteStructureForm[K],
    ) => {
        onChange({
            ...value,
            [field]: fieldValue,
        });
    };

    return (
        <div className="structure-step">
            <div className="structure-step__header">
                <div className="structure-step__header-icon">
                    <MdViewInAr
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className="structure-step__title">
                        Estructura
                    </h2>

                    <p className="structure-step__description">
                        Define las características físicas y
                        técnicas del sitio publicitario.
                    </p>
                </div>
            </div>

            <div className="structure-step__fields">
                <div className="structure-step__field">
                    <label className="structure-step__label">
                        Tipo de estructura
                    </label>

                    <SelectPicker
                        block
                        searchable={false}
                        cleanable
                        data={structureTypeOptions}
                        value={value.structureType}
                        placeholder="Selecciona un tipo"
                        onChange={(newValue) =>
                            updateField(
                                'structureType',
                                newValue ?? null,
                            )
                        }
                    />

                    <span className="structure-step__help">
                        Formato físico del sitio.
                    </span>
                </div>

                <div className="structure-step__field">
                    <label className="structure-step__label">
                        Número de caras
                    </label>

                    <InputNumber
                        block
                        min={1}
                        step={1}
                        value={value.faces}
                        placeholder="Ej. 2"
                        onChange={(newValue) =>
                            updateField(
                                'faces',
                                newValue === null
                                    ? null
                                    : Number(newValue),
                            )
                        }
                    />

                    <span className="structure-step__help">
                        Cantidad de caras disponibles.
                    </span>
                </div>

                <div className="structure-step__field">
                    <label className="structure-step__label">
                        Iluminación
                    </label>

                    <SelectPicker
                        block
                        searchable={false}
                        cleanable
                        data={lightingOptions}
                        value={value.lighting}
                        placeholder="Selecciona una opción"
                        onChange={(newValue) =>
                            updateField(
                                'lighting',
                                newValue ?? null,
                            )
                        }
                    />

                    <span className="structure-step__help">
                        Tipo de iluminación del sitio.
                    </span>
                </div>
            </div>

            <div className="structure-step__section">
                <div className="structure-step__section-header">
                    <h3>
                        Dimensiones
                    </h3>

                    <span>
                        Ingresa las medidas en metros.
                    </span>
                </div>

                <div className="structure-step__dimensions">
                    <div className="structure-step__field">
                        <label className="structure-step__label">
                            Alto
                        </label>

                        <div className="structure-step__measurement">
                            <InputNumber
                                block
                                min={0}
                                step={0.1}
                                value={value.height}
                                placeholder="0.00"
                                onChange={(newValue) =>
                                    updateField(
                                        'height',
                                        newValue === null
                                            ? null
                                            : Number(newValue),
                                    )
                                }
                            />

                            <span>m</span>
                        </div>
                    </div>

                    <div className="structure-step__field">
                        <label className="structure-step__label">
                            Largo
                        </label>

                        <div className="structure-step__measurement">
                            <InputNumber
                                block
                                min={0}
                                step={0.1}
                                value={value.length}
                                placeholder="0.00"
                                onChange={(newValue) =>
                                    updateField(
                                        'length',
                                        newValue === null
                                            ? null
                                            : Number(newValue),
                                    )
                                }
                            />

                            <span>m</span>
                        </div>
                    </div>

                    <div className="structure-step__field">
                        <label className="structure-step__label">
                            Diámetro
                        </label>

                        <div className="structure-step__measurement">
                            <InputNumber
                                block
                                min={0}
                                step={0.1}
                                value={value.diameter}
                                placeholder="0.00"
                                onChange={(newValue) =>
                                    updateField(
                                        'diameter',
                                        newValue === null
                                            ? null
                                            : Number(newValue),
                                    )
                                }
                            />

                            <span>m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="structure-step__section">
                <div className="structure-step__toggle-row">
                    <div>
                        <h3>
                            Orientación de calle
                        </h3>

                        <p>
                            Indica si el sitio tiene una
                            orientación específica respecto a
                            la circulación.
                        </p>
                    </div>

                    <Toggle
                        checked={value.hasStreetOrientation}
                        onChange={(checked) => {
                            onChange({
                                ...value,
                                hasStreetOrientation: checked,
                                streetOrientation: checked
                                    ? value.streetOrientation
                                    : '',
                            });
                        }}
                    />
                </div>

                {value.hasStreetOrientation && (
                    <div className="structure-step__orientation">
                        <label
                            className="structure-step__label"
                            htmlFor="street-orientation"
                        >
                            Orientación de la calle
                        </label>

                        <Input
                            id="street-orientation"
                            value={value.streetOrientation}
                            placeholder="Ej. Norte → Sur"
                            onChange={(newValue) =>
                                updateField(
                                    'streetOrientation',
                                    String(newValue),
                                )
                            }
                        />

                        <span className="structure-step__help">
                            Describe el sentido u orientación
                            de la circulación.
                        </span>
                    </div>
                )}
            </div>

            <div className="structure-step__field structure-step__field--full">
                <label
                    className="structure-step__label"
                    htmlFor="visibility-blockage"
                >
                    Bloqueo de visibilidad
                </label>

                <Input
                    id="visibility-blockage"
                    as="textarea"
                    rows={3}
                    value={value.visibilityBlockage}
                    placeholder="Ej. Árboles frente al sitio, mobiliario urbano..."
                    onChange={(newValue) =>
                        updateField(
                            'visibilityBlockage',
                            String(newValue),
                        )
                    }
                />

                <span className="structure-step__help">
                    Describe cualquier elemento que pueda
                    afectar la visibilidad del sitio.
                </span>
            </div>

            <div className="structure-step__actions">
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