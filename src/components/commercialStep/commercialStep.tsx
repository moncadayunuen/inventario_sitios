import {
    Button,
    InputNumber,
    SelectPicker,
} from 'rsuite';

import {
    MdArrowBack,
    MdArrowForward,
    MdCampaign,
} from 'react-icons/md';

import './commercialStep.scss';

export interface SiteCommercialForm {
    adType: string | null;
    spotDurationSeconds: number | null;
    spotsPerHour: number | null;
}

interface CommercialStepProps {
    value: SiteCommercialForm;
    onChange: (value: SiteCommercialForm) => void;
    onPrevious: () => void;
    onNext: () => void;
}

const adTypeOptions = [
    {
        label: 'Estático',
        value: 'static',
    },
    {
        label: 'Digital',
        value: 'digital',
    },
];

export default function CommercialStep({
                                           value,
                                           onChange,
                                           onPrevious,
                                           onNext,
                                       }: CommercialStepProps) {
    const updateField = <
        K extends keyof SiteCommercialForm,
    >(
        field: K,
        fieldValue: SiteCommercialForm[K],
    ) => {
        onChange({
            ...value,
            [field]: fieldValue,
        });
    };

    const isDigital =
        value.adType === 'digital';

    return (
        <div className="commercial-step">
            <div className="commercial-step__header">
                <div className="commercial-step__header-icon">
                    <MdCampaign
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className="commercial-step__title">
                        Comercial
                    </h2>

                    <p className="commercial-step__description">
                        Define la configuración comercial del
                        espacio publicitario.
                    </p>
                </div>
            </div>

            <div className="commercial-step__fields">
                <div className="commercial-step__field">
                    <label className="commercial-step__label">
                        Tipo de anuncio
                    </label>

                    <SelectPicker
                        block
                        searchable={false}
                        cleanable
                        data={adTypeOptions}
                        value={value.adType}
                        placeholder="Selecciona un tipo"
                        onChange={(newValue) => {
                            const adType =
                                newValue ?? null;

                            onChange({
                                ...value,
                                adType,
                                spotDurationSeconds:
                                    adType === 'digital'
                                        ? value.spotDurationSeconds
                                        : null,
                                spotsPerHour:
                                    adType === 'digital'
                                        ? value.spotsPerHour
                                        : null,
                            });
                        }}
                    />

                    <span className="commercial-step__help">
                        Formato de publicidad que admite el
                        sitio.
                    </span>
                </div>

                <div className="commercial-step__field">
                    <label className="commercial-step__label">
                        Duración por spot
                    </label>

                    <div className="commercial-step__measurement">
                        <InputNumber
                            block
                            min={1}
                            step={1}
                            disabled={!isDigital}
                            value={
                                value.spotDurationSeconds
                            }
                            placeholder="Ej. 10"
                            onChange={(newValue) =>
                                updateField(
                                    'spotDurationSeconds',
                                    newValue === null
                                        ? null
                                        : Number(newValue),
                                )
                            }
                        />

                        <span>seg</span>
                    </div>

                    <span className="commercial-step__help">
                        Duración de cada spot en segundos.
                    </span>
                </div>

                <div className="commercial-step__field">
                    <label className="commercial-step__label">
                        Spots por hora
                    </label>

                    <div className="commercial-step__measurement">
                        <InputNumber
                            block
                            min={1}
                            step={1}
                            disabled={!isDigital}
                            value={value.spotsPerHour}
                            placeholder="Ej. 360"
                            onChange={(newValue) =>
                                updateField(
                                    'spotsPerHour',
                                    newValue === null
                                        ? null
                                        : Number(newValue),
                                )
                            }
                        />

                        <span>/ h</span>
                    </div>

                    <span className="commercial-step__help">
                        Cantidad de spots reproducidos por
                        hora.
                    </span>
                </div>
            </div>

            {!isDigital && value.adType && (
                <div className="commercial-step__info">
                    La duración y los spots por hora aplican
                    únicamente a anuncios digitales.
                </div>
            )}

            <div className="commercial-step__actions">
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
                    Revisar
                </Button>
            </div>
        </div>
    );
}