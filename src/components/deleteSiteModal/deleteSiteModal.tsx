import {
    Button,
    Modal,
} from 'rsuite';

import {
    MdClose,
    MdDelete,
} from 'react-icons/md';

import type { Site } from '../../types/site';

import './deleteSiteModal.scss';

interface DeleteSiteModalProps {
    open: boolean;
    site: Site | null;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (site: Site) => void;
}

export default function DeleteSiteModal({
    open,
    site,
    loading = false,
    onClose,
    onConfirm,
}: DeleteSiteModalProps) {
    if (!site) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="xs"
            backdrop="static"
            keyboard={!loading}
            className="delete-site-modal"
        >
            <Modal.Body>
                <div className="delete-site-modal__header">
                    <div className="delete-site-modal__title-group">
                        <div className="delete-site-modal__icon">
                            <MdDelete
                                size={26}
                                aria-hidden="true"
                            />
                        </div>

                        <h2 className="delete-site-modal__title">
                            ¿Eliminar sitio?
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="delete-site-modal__close"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Cerrar"
                    >
                        <MdClose size={22} />
                    </button>
                </div>

                <p className="delete-site-modal__description">
                    Esta acción es irreversible. El sitio se eliminará
                    permanentemente del inventario.
                </p>

                <div className="delete-site-modal__site">
                    <span className="delete-site-modal__site-id">
                        ID {site.id}
                    </span>

                    <strong className="delete-site-modal__site-name">
                        {site.identification.name}
                    </strong>
                </div>

                <div className="delete-site-modal__actions">
                    <Button
                        appearance="ghost"
                        className="delete-site-modal__cancel"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>

                    <Button
                        appearance="primary"
                        className="delete-site-modal__confirm"
                        loading={loading}
                        disabled={loading}
                        startIcon={
                            <MdDelete
                                size={18}
                                aria-hidden="true"
                            />
                        }
                        onClick={() => onConfirm(site)}
                    >
                        Sí, eliminar
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}