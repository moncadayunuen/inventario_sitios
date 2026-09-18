import {
    IconButton,
    Popover,
    Table,
    Tag,
    Whisper,
} from 'rsuite';
import {
    MdDeleteOutline,
    MdEdit,
    MdLocationOn,
    MdMoreVert,
} from 'react-icons/md';
import type {Site, SiteStatus, SiteStructureType,} from '../../types/site';
import './inventoryTable.scss';
import type { UserRole } from '../../types/userRole';

const {
    Column,
    HeaderCell,
    Cell,
} = Table;

interface InventoryTableProps {
    sites: Site[];
    userRole: UserRole;
    loading?: boolean;
    onEdit?: (site: Site) => void;
    onDelete?: (site: Site) => void;
}

const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 48;

const TYPE_LABELS: Record<SiteStructureType, string> = {
    billboard: 'Espectacular',
    digital: 'Digital',
    mupi: 'MUPI',
    bus_shelter: 'Parabús',
    wall: 'Muro',
};

const STATUS_LABELS: Record<SiteStatus, string> = {
    available: 'Disponible',
    occupied: 'Ocupado',
    maintenance: 'Mantenimiento',
    inactive: 'Inactivo',
};

const formatUpdatedAt = (value: string,) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            date: value,
            time: '',
        };
    }

    return {
        date: new Intl.DateTimeFormat('es-MX',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            },
        ).format(date),

        time: new Intl.DateTimeFormat('es-MX',
            {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            },
        ).format(date),
    };
};

export default function InventoryTable({
   sites,
   userRole,
   loading = false,
   onEdit,
   onDelete,
}: InventoryTableProps) {

    const tableHeight = HEADER_HEIGHT + Math.max(sites.length, 1,) * ROW_HEIGHT;
    const showOwnerColumn = userRole !== 'media_owner';

    return (
        <div className="inventory-table">
            <Table
                height={tableHeight}
                data={sites}
                loading={loading}
                rowHeight={ROW_HEIGHT}
                headerHeight={HEADER_HEIGHT}
                bordered={false}
                cellBordered={false}
                locale={{
                    emptyMessage:
                        'No encontramos sitios con estos criterios.',
                    loading:
                        'Cargando...',
                }}
            >
                {/* ID */}

                <Column
                    width={110}
                    fixed
                >
                    <HeaderCell>ID</HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <span className="inventory-table__id">{rowData.id}</span>
                        )}
                    </Cell>
                </Column>

                <Column
                    flexGrow={1}
                    minWidth={190}
                >
                    <HeaderCell>Sitio</HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <div className="inventory-table__site-content">
                                <strong className="inventory-table__site">
                                    {
                                        rowData
                                            .identification
                                            .name
                                    }
                                </strong>

                                <span className="inventory-table__site-secondary">
                                    {
                                        rowData
                                            .location
                                            .address
                                    }
                                </span>
                            </div>
                        )}
                    </Cell>
                </Column>

                <Column width={120}>
                    <HeaderCell>Tipo</HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <Tag
                                className={[
                                    'inventory-table__type-tag',
                                    `inventory-table__type-tag--${rowData.structure.type}`,
                                ].join(' ')}
                            >
                                {
                                    TYPE_LABELS[
                                        rowData
                                            .structure
                                            .type
                                        ]
                                }
                            </Tag>
                        )}
                    </Cell>
                </Column>

                <Column width={150}>
                    <HeaderCell>
                        Estado
                    </HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <Tag
                                className={[
                                    'inventory-table__status-tag',
                                    `inventory-table__status-tag--${rowData.status}`,
                                ].join(' ')}
                            >
                                <span
                                    className="inventory-table__status-dot"
                                    aria-hidden="true"
                                />
                                {STATUS_LABELS[rowData.status]}
                            </Tag>
                        )}
                    </Cell>
                </Column>

                {/* Ubicación */}

                <Column
                    flexGrow={1}
                    minWidth={180}
                >
                    <HeaderCell>Ubicación</HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <div className="inventory-table__location-content">
                                <MdLocationOn
                                    className="inventory-table__location-icon"
                                    size={16}
                                    aria-hidden="true"
                                />

                                <div className="inventory-table__location-text">
                                    <strong className="inventory-table__location">
                                        {
                                            rowData
                                                .location
                                                .municipality
                                        }
                                        ,{' '}
                                        {
                                            rowData
                                                .location
                                                .state
                                        }
                                    </strong>

                                    {rowData.location.metroArea && (
                                        <span className="inventory-table__location-secondary">
                                            {
                                                rowData
                                                    .location
                                                    .metroArea
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </Cell>
                </Column>

                {showOwnerColumn && (
                    <Table.Column flexGrow={1}>
                        <Table.HeaderCell>
                            Dueño
                        </Table.HeaderCell>

                        <Table.Cell>
                            {(rowData: Site) => (
                                <span>
                                    {rowData.identification.owner.name}
                                </span>
                            )}
                        </Table.Cell>
                    </Table.Column>
                )}

                {/* Última actualización */}

                <Column width={150}>
                    <HeaderCell>Última actualización</HeaderCell>

                    <Cell>
                        {(rowData: Site) => {
                            const updatedAt = formatUpdatedAt(rowData.updatedAt,);

                            return (
                                <div className="inventory-table__updated">
                                    <strong className="inventory-table__updated-date">
                                        {updatedAt.date}
                                    </strong>

                                    {updatedAt.time && (
                                        <span className="inventory-table__updated-time">
                                            {updatedAt.time}
                                        </span>
                                    )}
                                </div>
                            );
                        }}
                    </Cell>
                </Column>

                {/* Acciones */}

                <Column
                    width={64}
                    align="center"
                    fixed="right"
                >
                    <HeaderCell>Acciones</HeaderCell>

                    <Cell>
                        {(rowData: Site) => (
                            <Whisper
                                placement="bottomEnd"
                                trigger="click"
                                speaker={
                                    <Popover className="inventory-table__actions-popover">
                                        <button
                                            type="button"
                                            className="inventory-table__action-option"
                                            onClick={() => onEdit?.(rowData,)}
                                        >
                                            <MdEdit
                                                size={18}
                                                aria-hidden="true"
                                            />
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="
                                                inventory-table__action-option
                                                inventory-table__action-option--danger
                                            "
                                            onClick={() => onDelete?.(rowData,)}
                                        >
                                            <MdDeleteOutline
                                                size={18}
                                                aria-hidden="true"
                                            />
                                            Eliminar
                                        </button>
                                    </Popover>
                                }
                            >
                                <IconButton
                                    appearance="subtle"
                                    size="sm"
                                    className="inventory-table__actions-button"
                                    icon={
                                        <MdMoreVert size={20} />
                                    }
                                    aria-label={`Acciones para ${rowData.identification.name}`}
                                />
                            </Whisper>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
}