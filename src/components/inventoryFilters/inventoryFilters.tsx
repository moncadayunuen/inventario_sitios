import { useState } from 'react';

import {
    Button,
    Checkbox,
    Input,
    InputGroup,
} from 'rsuite';

import {
    MdSearch,
    MdTune,
} from 'react-icons/md';

import type {
    InventoryFilterOption,
    InventoryFilterValues,
} from '../../types/inventory';

import type {
    SiteStatus,
    SiteStructureType,
} from '../../types/site';

import './inventoryFilters.scss';
import type {UserRole} from "../../types/userRole.ts";

interface InventoryFiltersProps {
    filters: InventoryFilterValues;
    userRole: UserRole;
    statusOptions: InventoryFilterOption<SiteStatus>[];
    typeOptions: InventoryFilterOption<SiteStructureType>[];
    ownerOptions: InventoryFilterOption[];
    stateOptions: InventoryFilterOption[];
    onChange: <K extends keyof InventoryFilterValues, >(
        key: K,
        value: InventoryFilterValues[K],
    ) => void;

    onClear: () => void;
}

const DEFAULT_VISIBLE_OPTIONS = 5;

function toggleValue<T extends string>(
    values: T[],
    value: T,
): T[] {
    return values.includes(value)
        ? values.filter(
            (item) => item !== value,
        )
        : [...values, value];
}

export default function InventoryFilters({
     filters,
     userRole,
     statusOptions,
     typeOptions,
     ownerOptions,
     stateOptions,
     onChange,
     onClear,
 }: InventoryFiltersProps) {
    const showOwnerFilter = userRole !== 'media_owner';
    const [ownerSearch, setOwnerSearch] = useState('');
    const [stateSearch, setStateSearch] = useState('');
    const [showAllOwners, setShowAllOwners,] = useState(false);
    const [showAllStates, setShowAllStates,] = useState(false);

    const filteredOwnerOptions =
        ownerOptions.filter((option) =>
            option.label
                .toLowerCase()
                .includes(
                    ownerSearch
                        .trim()
                        .toLowerCase(),
                ),
        );

    const filteredStateOptions =
        stateOptions.filter((option) =>
            option.label
                .toLowerCase()
                .includes(
                    stateSearch
                        .trim()
                        .toLowerCase(),
                ),
        );

    const visibleOwnerOptions =
        ownerSearch || showAllOwners
            ? filteredOwnerOptions
            : filteredOwnerOptions.slice(
                0,
                DEFAULT_VISIBLE_OPTIONS,
            );

    const visibleStateOptions =
        stateSearch || showAllStates
            ? filteredStateOptions
            : filteredStateOptions.slice(
                0,
                DEFAULT_VISIBLE_OPTIONS,
            );

    const activeFilterCount =
        filters.statuses.length +
        filters.types.length +
        filters.owners.length +
        filters.states.length;

    const handleReset = () => {
        setOwnerSearch('');
        setStateSearch('');
        setShowAllOwners(false);
        setShowAllStates(false);

        onClear();
    };

    return (
        <div className="inventory-filters">
            <div className="inventory-filters__body">
                {/* Header */}

                <div className="inventory-filters__header">
                    <div>
                        <h2 className="inventory-filters__title">
                            Filtros
                        </h2>

                        <p className="inventory-filters__description">
                            Refina los sitios mostrados.
                        </p>
                    </div>

                    <MdTune
                        className="inventory-filters__header-icon"
                        aria-hidden="true"
                    />
                </div>

                {/* Status */}

                <section
                    className="inventory-filters__section"
                    aria-labelledby="filter-status-title"
                >
                    <h3
                        id="filter-status-title"
                        className="inventory-filters__section-title"
                    >
                        Estado
                    </h3>

                    <div className="inventory-filters__options">
                        {statusOptions.map(
                            (option) => (
                                <Checkbox
                                    key={option.value}
                                    checked={filters.statuses.includes(
                                        option.value,
                                    )}
                                    onChange={() =>
                                        onChange(
                                            'statuses',
                                            toggleValue(
                                                filters.statuses,
                                                option.value,
                                            ),
                                        )
                                    }
                                >
                                    {option.label}
                                </Checkbox>
                            ),
                        )}
                    </div>
                </section>

                {/* Site type */}

                <section
                    className="inventory-filters__section"
                    aria-labelledby="filter-type-title"
                >
                    <h3
                        id="filter-type-title"
                        className="inventory-filters__section-title"
                    >
                        Tipo de sitio
                    </h3>

                    <div className="inventory-filters__options">
                        {typeOptions.map(
                            (option) => (
                                <Checkbox
                                    key={option.value}
                                    checked={filters.types.includes(
                                        option.value,
                                    )}
                                    onChange={() =>
                                        onChange(
                                            'types',
                                            toggleValue(
                                                filters.types,
                                                option.value,
                                            ),
                                        )
                                    }
                                >
                                    {option.label}
                                </Checkbox>
                            ),
                        )}
                    </div>
                </section>

                {/* Owner */}
                {showOwnerFilter && (

                <section
                    className="inventory-filters__section"
                    aria-labelledby="filter-owner-title"
                >
                    <h3
                        id="filter-owner-title"
                        className="inventory-filters__section-title"
                    >
                        Propietario
                    </h3>

                    <InputGroup className="inventory-filters__search">
                        <InputGroup.Addon>
                            <MdSearch
                                size={17}
                                aria-hidden="true"
                            />
                        </InputGroup.Addon>

                        <Input
                            value={ownerSearch}
                            onChange={setOwnerSearch}
                            placeholder="Buscar propietario..."
                            aria-label="Buscar propietario"
                        />
                    </InputGroup>

                    <div className="inventory-filters__options">
                        {visibleOwnerOptions.map(
                            (option) => (
                                <Checkbox
                                    key={option.value}
                                    checked={filters.owners.includes(
                                        option.value,
                                    )}
                                    onChange={() =>
                                        onChange(
                                            'owners',
                                            toggleValue(
                                                filters.owners,
                                                option.value,
                                            ),
                                        )
                                    }
                                >
                                    {option.label}
                                </Checkbox>
                            ),
                        )}
                    </div>

                    {!ownerSearch &&
                        filteredOwnerOptions.length >
                        DEFAULT_VISIBLE_OPTIONS && (
                            <button
                                type="button"
                                className="inventory-filters__show-more"
                                onClick={() =>
                                    setShowAllOwners(
                                        (current) =>
                                            !current,
                                    )
                                }
                            >
                                {showAllOwners
                                    ? 'Mostrar menos'
                                    : 'Mostrar más'}
                            </button>
                        )}
                </section>
                )}

                {/* Location state */}

                <section
                    className="inventory-filters__section"
                    aria-labelledby="filter-location-title"
                >
                    <h3
                        id="filter-location-title"
                        className="inventory-filters__section-title"
                    >
                        Estado (ubicación)
                    </h3>

                    <InputGroup className="inventory-filters__search">
                        <InputGroup.Addon>
                            <MdSearch
                                size={17}
                                aria-hidden="true"
                            />
                        </InputGroup.Addon>

                        <Input
                            value={stateSearch}
                            onChange={setStateSearch}
                            placeholder="Buscar estado..."
                            aria-label="Buscar estado"
                        />
                    </InputGroup>

                    <div className="inventory-filters__options">
                        {visibleStateOptions.map(
                            (option) => (
                                <Checkbox
                                    key={option.value}
                                    checked={filters.states.includes(
                                        option.value,
                                    )}
                                    onChange={() =>
                                        onChange(
                                            'states',
                                            toggleValue(
                                                filters.states,
                                                option.value,
                                            ),
                                        )
                                    }
                                >
                                    {option.label}
                                </Checkbox>
                            ),
                        )}
                    </div>

                    {!stateSearch &&
                        filteredStateOptions.length >
                        DEFAULT_VISIBLE_OPTIONS && (
                            <button
                                type="button"
                                className="inventory-filters__show-more"
                                onClick={() =>
                                    setShowAllStates(
                                        (current) =>
                                            !current,
                                    )
                                }
                            >
                                {showAllStates
                                    ? 'Mostrar menos'
                                    : 'Mostrar más'}
                            </button>
                        )}
                </section>
            </div>

            {/* Footer */}

            <div className="inventory-filters__actions">
                <Button
                    appearance="default"
                    className="inventory-filters__reset"
                    disabled={activeFilterCount === 0}
                    onClick={handleReset}
                >
                    Restablecer
                </Button>

                <Button
                    appearance="primary"
                    className="inventory-filters__apply"
                >
                    Aplicar filtros
                </Button>
            </div>
        </div>
    );
}