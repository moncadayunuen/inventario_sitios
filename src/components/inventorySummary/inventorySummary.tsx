import type {
    SiteStatus,
} from '../../types/site';
import './inventorySummary.scss';

export type InventoryStatusTab =
    | 'all'
    | SiteStatus;

interface InventorySummaryProps {
    total: number;
    available: number;
    occupied: number;
    maintenance: number;
    inactive: number;

    activeStatus: InventoryStatusTab;

    onChange: (
        status: InventoryStatusTab,
    ) => void;
}

export default function InventorySummary({
 total,
 available,
 occupied,
 maintenance,
 inactive,
 activeStatus,
 onChange,
}: InventorySummaryProps) {
    return (
        <div
            className="inventory-summary"
            role="tablist"
            aria-label="Estado de los sitios"
        >
            <button
                type="button"
                role="tab"
                aria-selected={
                    activeStatus === 'all'
                }
                className={[
                    'inventory-summary__item',
                    activeStatus === 'all' ? 'inventory-summary__item--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => onChange('all')}
            >
                <span className="inventory-summary__label">
                    Todos
                </span>

                <strong className="inventory-summary__value">
                    {total.toLocaleString('es-MX')}
                </strong>
            </button>

            <button
                type="button"
                role="tab"
                aria-selected={activeStatus === 'available'}
                className={[
                    'inventory-summary__item',
                    activeStatus === 'available' ? 'inventory-summary__item--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => onChange('available')}
            >
                <span
                    className="
                        inventory-summary__dot
                        inventory-summary__dot--available
                    "
                    aria-hidden="true"
                />

                <span className="inventory-summary__label">
                    Disponibles
                </span>

                <strong className="inventory-summary__value">
                    {available.toLocaleString('es-MX')}
                </strong>
            </button>

            <button
                type="button"
                role="tab"
                aria-selected={
                    activeStatus === 'occupied'
                }
                className={[
                    'inventory-summary__item',
                    activeStatus === 'occupied' ? 'inventory-summary__item--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => onChange('occupied')}
            >
                <span
                    className="
                        inventory-summary__dot
                        inventory-summary__dot--occupied
                    "
                    aria-hidden="true"
                />

                <span className="inventory-summary__label">
                    Ocupados
                </span>

                <strong className="inventory-summary__value">
                    {occupied.toLocaleString('es-MX')}
                </strong>
            </button>

            <button
                type="button"
                role="tab"
                aria-selected={
                    activeStatus === 'maintenance'
                }
                className={[
                    'inventory-summary__item',
                    activeStatus === 'maintenance' ? 'inventory-summary__item--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => onChange('maintenance')}
            >
                <span
                    className="
                        inventory-summary__dot
                        inventory-summary__dot--maintenance
                    "
                    aria-hidden="true"
                />

                <span className="inventory-summary__label">
                    Mantenimiento
                </span>

                <strong className="inventory-summary__value">
                    {maintenance.toLocaleString('es-MX')}
                </strong>
            </button>

            <button
                type="button"
                role="tab"
                aria-selected={activeStatus === 'inactive'}
                className={[
                    'inventory-summary__item',
                    activeStatus === 'inactive' ? 'inventory-summary__item--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => onChange('inactive')}
            >
                <span
                    className="
                        inventory-summary__dot
                        inventory-summary__dot--inactive
                    "
                    aria-hidden="true"
                />

                <span className="inventory-summary__label">
                    Inactivos
                </span>

                <strong className="inventory-summary__value">
                    {inactive.toLocaleString('es-MX')}
                </strong>
            </button>
        </div>
    );
}