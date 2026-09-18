import { useRef } from 'react';
import {
    Button,
    Input,
    SelectPicker,
} from 'rsuite';
import {
    MdAdd,
    MdCloudUpload,
    MdDescription,
} from 'react-icons/md';
import './identificationStep.scss';

export interface SiteIdentificationForm {
    id: string;
    name: string;
    ownerId: string | null;
    images: File[];
}

interface OwnerOption {
    label: string;
    value: string;
}

interface IdentificationStepProps {
    value: SiteIdentificationForm;
    ownerOptions: OwnerOption[];
    onChange: (value: SiteIdentificationForm) => void;
    onCancel: () => void;
    onNext: () => void;
}

const MAX_IMAGES = 5;

const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
];

export default function IdentificationStep({
                                               value,
                                               ownerOptions,
                                               onChange,
                                               onCancel,
                                               onNext,
                                           }: IdentificationStepProps) {
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const updateField = <
        K extends keyof SiteIdentificationForm,
    >(
        field: K,
        fieldValue: SiteIdentificationForm[K],
    ) => {
        onChange({
            ...value,
            [field]: fieldValue,
        });
    };

    const handleFiles = (
        files: FileList | null,
    ) => {
        if (!files) {
            return;
        }

        const validFiles = Array.from(files).filter(
            (file) =>
                ALLOWED_IMAGE_TYPES.includes(file.type) &&
                file.size <= 10 * 1024 * 1024,
        );

        const availableSlots =
            MAX_IMAGES - value.images.length;

        updateField(
            'images',
            [
                ...value.images,
                ...validFiles.slice(0, availableSlots),
            ],
        );
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        handleFiles(event.dataTransfer.files);
    };

    const canContinue =
        value.id.trim() !== '' &&
        value.name.trim() !== '' &&
        value.ownerId !== null;

    return (
        <div className="identification-step">
            <div className="identification-step__header">
                <div className="identification-step__header-icon">
                    <MdDescription
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className="identification-step__title">
                        Identificación
                    </h2>

                    <p className="identification-step__description">
                        Ingresa la información básica del sitio
                        publicitario.
                    </p>
                </div>
            </div>

            <div className="identification-step__fields">
                <div className="identification-step__field">
                    <label
                        className="identification-step__label"
                        htmlFor="site-id"
                    >
                        ID del sitio
                        <span aria-hidden="true"> *</span>
                    </label>

                    <Input
                        id="site-id"
                        value={value.id}
                        placeholder="Ej. S-551-MX"
                        onChange={(newValue) =>
                            updateField(
                                'id',
                                String(newValue),
                            )
                        }
                    />

                    <span className="identification-step__help">
                        Identificador único del sitio.
                    </span>
                </div>

                <div className="identification-step__field">
                    <label
                        className="identification-step__label"
                        htmlFor="site-name"
                    >
                        Nombre del sitio
                        <span aria-hidden="true"> *</span>
                    </label>

                    <Input
                        id="site-name"
                        value={value.name}
                        placeholder="Ej. Vía Inventory 12"
                        onChange={(newValue) =>
                            updateField(
                                'name',
                                String(newValue),
                            )
                        }
                    />

                    <span className="identification-step__help">
                        Nombre corto para que identifiques el sitio.
                    </span>
                </div>

                <div className="identification-step__field">
                    <label className="identification-step__label">
                        Propietario
                        <span aria-hidden="true"> *</span>
                    </label>

                    <SelectPicker
                        block
                        searchable
                        cleanable
                        data={ownerOptions}
                        value={value.ownerId}
                        placeholder="Selecciona un propietario"
                        onChange={(newValue) =>
                            updateField(
                                'ownerId',
                                newValue ?? null,
                            )
                        }
                    />

                    <span className="identification-step__help">
                        Dueño del medio.
                    </span>
                </div>
            </div>

            <div className="identification-step__images">
                <div className="identification-step__images-header">
                    <div>
                        <h3 className="identification-step__images-title">
                            Imágenes del sitio
                        </h3>

                        <p className="identification-step__images-description">
                            Agrega fotografías del sitio. Puedes
                            subir hasta {MAX_IMAGES} imágenes.
                        </p>
                    </div>

                    {value.images.length > 0 && (
                        <span className="identification-step__images-count">
                            {value.images.length}/{MAX_IMAGES}
                        </span>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    className="identification-step__file-input"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(event) => {
                        handleFiles(event.target.files);

                        event.target.value = '';
                    }}
                />

                <div
                    className="identification-step__dropzone"
                    role="button"
                    tabIndex={0}
                    onDragOver={(event) =>
                        event.preventDefault()
                    }
                    onDrop={handleDrop}
                    onClick={() =>
                        fileInputRef.current?.click()
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === 'Enter' ||
                            event.key === ' '
                        ) {
                            event.preventDefault();
                            fileInputRef.current?.click();
                        }
                    }}
                >
                    <MdCloudUpload
                        className="identification-step__upload-icon"
                        size={25}
                        aria-hidden="true"
                    />

                    <strong>
                        Arrastra y suelta imágenes aquí o haz
                        clic para seleccionar
                    </strong>

                    <span>
                        Formatos JPG, JPEG, PNG · Máx. 10 MB por
                        imagen
                    </span>
                </div>

                {value.images.length > 0 && (
                    <div className="identification-step__image-list">
                        {value.images.map(
                            (image, index) => (
                                <div
                                    key={`${image.name}-${index}`}
                                    className="identification-step__image-item"
                                >
                                    <span>
                                        {image.name}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateField(
                                                'images',
                                                value.images.filter(
                                                    (
                                                        _,
                                                        imageIndex,
                                                    ) =>
                                                        imageIndex !==
                                                        index,
                                                ),
                                            )
                                        }
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ),
                        )}
                    </div>
                )}
            </div>

            <div className="identification-step__actions">
                <Button
                    appearance="ghost"
                    type="button"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>

                <Button
                    appearance="primary"
                    type="button"
                    disabled={!canContinue}
                    startIcon={
                        <MdAdd
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