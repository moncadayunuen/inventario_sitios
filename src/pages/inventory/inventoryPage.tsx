import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Button,
    Input,
    InputGroup,
    Pagination,
    Tag,
} from 'rsuite';

import {
    MdAdd,
    MdFilterList,
    MdSearch,
} from 'react-icons/md';
import { generateSites } from '../../data/generateSites';
import InventoryFilters from '../../components/inventoryFilters/inventoryFilters';
import InventoryTable from '../../components/inventoryTable/inventoryTable';
import {
    EMPTY_INVENTORY_FILTERS,
    type InventoryFilterValues,
} from '../../types/inventory';
import type {
    Site,
    SiteStatus,
    SiteStructureType,
} from '../../types/site';
import './inventoryPage.scss';
import DeleteSiteModal from "../../components/deleteSiteModal/deleteSiteModal.tsx";
import PageHeader from "../../components/titlePage/pageHeader.tsx";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.tsx";
import InventorySummary from "../../components/inventorySummary/inventorySummary.tsx";
import { useOutletContext } from 'react-router-dom';
import type { UserRole } from '../../types/userRole';

const DEFAULT_PAGE_SIZE = 8;

const STATUS_LABELS: Record<SiteStatus, string> = {
    available: 'Disponible',
    occupied: 'Ocupado',
    maintenance: 'Mantenimiento',
    inactive: 'Inactivo',
};

const TYPE_LABELS: Record<SiteStructureType, string> = {
    billboard: 'Espectacular',
    digital: 'Digital',
    mupi: 'MUPI',
    bus_shelter: 'Parabús',
    wall: 'Muro',
};

type StatusTab = | 'all' | SiteStatus;

export default function InventoryPage() {
    const sites = useMemo(() => generateSites(40000), [],);
    const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
    const [deletingSite, setDeletingSite] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [search, setSearch] = useState('');
    const [, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<InventoryFilterValues>(EMPTY_INVENTORY_FILTERS,);
    const { userRole } = useOutletContext<{ userRole: UserRole; }>();
    const canManageSites = userRole === 'media_owner';

    const handleDeleteSite = async (site: Site) => {
        try {
            setDeletingSite(true);
            console.log('Eliminar sitio:', site.id);
            setSiteToDelete(null);
        } finally {
            setDeletingSite(false);
        }
    };

    const inventoryDescription: Record<UserRole, string> = {
        media_owner: 'Consulta y administra tu inventario de sitios publicitarios.',
        agency: 'Consulta y administra los sitios autorizados disponibles para tu agencia.',
        brand: 'Consulta los sitios publicitarios contratados a través de tu agencia.',
    };

    const statusOptions =
        useMemo(() => {
            return [
                ...new Set(
                    sites.map(
                        (site) =>
                            site.status,
                    ),
                ),
            ].map((status) => ({
                label:
                    STATUS_LABELS[
                        status
                        ],
                value: status,
            }));
        }, [sites]);

    const typeOptions = useMemo(() => {
            return [
                ...new Set(
                    sites.map(
                        (site) =>
                            site
                                .structure
                                .type,
                    ),
                ),
            ].map((type) => ({
                label: TYPE_LABELS[type],
                value: type,
            }));
        }, [sites]);

    const ownerOptions =
        useMemo(() => {
            const owners = new Map<string, string>();

            sites.forEach(
                (site) => {
                    owners.set(
                        site
                            .identification
                            .owner
                            .id,
                        site
                            .identification
                            .owner
                            .name,
                    );
                },
            );

            return Array.from(
                owners,
            ).map(
                ([value, label,]) => ({label, value,}),
            );
        }, [sites]);

    const stateOptions = useMemo(() => {
            return [
                ...new Set(
                    sites.map(
                        (site) =>
                            site
                                .location
                                .state,
                    ),
                ),
            ]
                .sort()
                .map(
                    (state) => ({
                        label: state,
                        value: state,
                    }),
                );
        }, [sites]);
    const statusSummary = useMemo(() => {
            return sites.reduce(
                (
                    summary,
                    site,
                ) => {
                    summary.total += 1;

                    summary[
                        site.status
                        ] += 1;

                    return summary;
                },
                {
                    total: 0,
                    available: 0,
                    occupied: 0,
                    maintenance: 0,
                    inactive: 0,
                },
            );
        }, [sites]);
    const activeStatusTab = useMemo<StatusTab>(
            () => {
                if (filters.statuses.length !== 1) {
                    return 'all';
                }
                return filters
                    .statuses[0];
            },
            [filters.statuses],
        );

    const filteredSites = useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            return sites.filter(
                (site) => {
                    const searchableContent =
                        [
                            site.id,

                            site
                                .identification
                                .name,

                            site
                                .identification
                                .owner
                                .name,

                            site
                                .location
                                .municipality,

                            site
                                .location
                                .state,

                            site
                                .location
                                .metroArea,

                            site
                                .location
                                .address,
                        ]
                            .join(' ')
                            .toLowerCase();

                    const matchesSearch = !query || searchableContent.includes(query,);
                    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(site.status,);
                    const matchesType =
                        filters.types.length === 0 ||
                        filters.types.includes(site.structure.type,);

                    const matchesOwner =
                        filters.owners.length === 0 ||
                        filters.owners.includes(site.identification.owner.id,);

                    const matchesState =
                        filters.states.length === 0 ||
                        filters.states.includes(site.location.state,);

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesType &&
                        matchesOwner &&
                        matchesState
                    );
                },
            );
        }, [sites, search, filters,]);

    const handlePageSizeChange = useCallback((nextPageSize: number,)=> {
        const safePageSize = Math.max(5, Math.min(nextPageSize, 10,),);

        setPageSize((currentPageSize,) => {
                if (currentPageSize === safePageSize) {
                    return currentPageSize;
                }
                return safePageSize;
            },
        );
    }, [],);

    useEffect(() => {
        const totalPages = Math.max(1, Math.ceil(filteredSites.length / pageSize,),);
        setPage((currentPage) => Math.min(currentPage, totalPages,),);
    }, [filteredSites.length, pageSize,]);

    const visibleSites =
        useMemo(() => {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;

        return filteredSites.slice(
            start,
            end,
        );
    }, [filteredSites, page, pageSize,]);

    const startRecord = filteredSites.length === 0 ? 0 : (page - 1) * pageSize + 1;
    const endRecord = Math.min(page * pageSize, filteredSites.length,);

    const activeFilterCount =
    useMemo(() => {
        return (
            filters.statuses.length +
            filters.types.length +
            filters.owners.length +
            filters.states.length
        );
    }, [filters]);

    const handleFilterChange = <K extends keyof InventoryFilterValues, >(
        key: K,
        value: InventoryFilterValues[K],
    ) => {
        setFilters((current) => ({...current, [key]: value,}),);
        setPage(1);
    };

    const handleStatusTabChange = (status: StatusTab,) => {
        setFilters(
            (current) => ({
                ...current,
                statuses: status === 'all' ? [] : [status],
            }),
        );

        setPage(1);
    };

    const handleClearFilters = () => {
        setFilters(EMPTY_INVENTORY_FILTERS,);
        setPage(1);
    };

    return (
        <section className="inventory">
            <div className="inventory__layout">
                <div className="inventory__main">
                    <Breadcrumb
                        items={[
                            {label: 'Inventario',},
                            {label: 'Sitios publicitarios',},
                        ]}
                    />
                    <PageHeader
                        title="Sitios publicitarios"
                        description={inventoryDescription[userRole]}
                        action={
                            <Button
                                appearance="primary"
                                className="inventory__create-button"
                                startIcon={<MdAdd size={18} aria-hidden="true"/>
                                }
                                onClick={() => {
                                    //
                                }}
                            >
                                Nuevo sitio
                            </Button>
                        }
                    />

                    <div className="inventory__content">
                        <InventorySummary
                            total={statusSummary.total}
                            available={statusSummary.available}
                            occupied={statusSummary.occupied}
                            maintenance={statusSummary.maintenance}
                            inactive={statusSummary.inactive}
                            activeStatus={activeStatusTab}
                            onChange={handleStatusTabChange}
                        />

                        <div className="inventory__toolbar">
                            <div className="inventory__search">
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <MdSearch />
                                    </InputGroup.Addon>

                                    <Input
                                        value={search}
                                        onChange={(value) => {
                                            setSearch(value);
                                            setPage(1);
                                        }}
                                        placeholder="Buscar en resultados..."
                                    />
                                </InputGroup>
                            </div>

                            <div className="inventory__toolbar-end">
                                <Button
                                    appearance="ghost"
                                    className="inventory__filter-button"
                                    startIcon={
                                        <MdFilterList
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    }
                                    onClick={() => {
                                        setFiltersOpen(true);
                                    }}
                                >
                                    <span>Filtros</span>
                                    {activeFilterCount > 0 && (
                                        <span className="inventory__filter-count">{activeFilterCount}</span>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {activeFilterCount >
                            0 && (
                                <div className="inventory__active-filters">
                                    <span className="inventory__active-filters-label">
                                        Filtros activos:
                                    </span>

                                    {filters.statuses.map(
                                        (
                                            status,
                                        ) => (
                                            <Tag
                                                key={status}
                                                closable
                                                className="inventory__filter-tag"
                                                onClose={() => handleFilterChange('statuses', filters.statuses.filter((item,) => item !== status,),)}
                                            >
                                                {STATUS_LABELS[status]}
                                            </Tag>
                                        ),
                                    )}

                                    {filters.types.map(
                                        (
                                            type,
                                        ) => (
                                            <Tag
                                                key={type}
                                                closable
                                                className="inventory__filter-tag"
                                                onClose={() => handleFilterChange('types', filters.types.filter((item,) => item !== type,),)}
                                            >
                                                {TYPE_LABELS[type]}
                                            </Tag>
                                        ),
                                    )}

                                    {filters.owners.map(
                                        (
                                            ownerId,
                                        ) => {
                                            const owner = ownerOptions.find((option,) => option.value === ownerId,);

                                            return (
                                                <Tag
                                                    key={ownerId}
                                                    closable
                                                    className="inventory__filter-tag"
                                                    onClose={() => handleFilterChange('owners', filters.owners.filter((item,) => item !== ownerId,),)}
                                                >
                                                    {owner?.label ?? ownerId}
                                                </Tag>
                                            );
                                        },
                                    )}

                                    {filters.states.map(
                                        (state,) => (
                                            <Tag
                                                key={state}
                                                closable
                                                className="inventory__filter-tag"
                                                onClose={() => handleFilterChange('states', filters.states.filter((item,) => item !== state,),)}
                                            >
                                                {state}
                                            </Tag>
                                        ),
                                    )}

                                    <Button
                                        appearance="link"
                                        size="sm"
                                        className="inventory__clear-filters"
                                        onClick={handleClearFilters}
                                    >
                                        Limpiar todos
                                    </Button>
                                </div>
                            )}

                        <div className="inventory__table">
                            <InventoryTable
                                userRole={userRole}
                                sites={visibleSites}
                                onDelete={(site) => {setSiteToDelete(site);}}
                                onEdit={(site) => {console.log('Editar sitio:', site.id);}}
                            />
                        </div>

                        <footer className="inventory__footer">
                            <span className="inventory__pagination-info">
                                Mostrando{' '}
                                {startRecord}–
                                {endRecord}{' '}
                                de{' '}
                                {filteredSites.length.toLocaleString('es-MX',)}{' '}
                                sitios
                            </span>

                            <div className="inventory__pagination">
                                <Pagination
                                    prev
                                    next
                                    first
                                    last
                                    ellipsis
                                    maxButtons={5}
                                    size="sm"
                                    total={filteredSites.length}
                                    limit={pageSize}
                                    activePage={page}
                                    onChangePage={setPage}
                                />
                            </div>
                        </footer>
                    </div>
                </div>

                {/* Desktop filters */}

                <aside
                    className="inventory__filters-panel"
                    aria-label="Filtros de inventario"
                >
                    <InventoryFilters
                        userRole={userRole}
                        filters={filters}
                        statusOptions={statusOptions}
                        typeOptions={typeOptions}
                        ownerOptions={ownerOptions}
                        stateOptions={stateOptions}
                        onChange={handleFilterChange}
                        onClear={handleClearFilters}
                    />
                </aside>
            </div>
            <DeleteSiteModal
                open={siteToDelete !== null}
                site={siteToDelete}
                loading={deletingSite}
                onClose={() => {
                    if (!deletingSite) {
                        setSiteToDelete(null);
                    }
                }}
                onConfirm={handleDeleteSite}
            />
        </section>
    );
}