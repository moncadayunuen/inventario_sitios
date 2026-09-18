import { faker } from '@faker-js/faker';

import type {
    AdType,
    Site,
    SiteStatus,
    SiteStructureType,
} from './site.ts';

export interface InventoryFilterValues {
    statuses: SiteStatus[];
    types: SiteStructureType[];
    owners: string[];
    states: string[];
}

export type InventoryFilterKey =
    keyof InventoryFilterValues;

export interface InventoryFilterOption<T extends string = string> {
    label: string;
    value: T;
}

export const EMPTY_INVENTORY_FILTERS: InventoryFilterValues = {
    statuses: [],
    types: [],
    owners: [],
    states: [],
};

const OWNERS = [
    {
        id: 'owner-001',
        name: 'Publimedios Occidente',
    },
    {
        id: 'owner-002',
        name: 'OOH Media México',
    },
    {
        id: 'owner-003',
        name: 'Espacios Urbanos',
    },
    {
        id: 'owner-004',
        name: 'Grupo Vía',
    },
    {
        id: 'owner-005',
        name: 'Impacto Exterior',
    },
];

const LOCATIONS = [
    {
        country: 'México',
        state: 'Jalisco',
        municipality: 'Guadalajara',
        metroArea: 'Zona Metropolitana de Guadalajara',
        latitude: 20.6736,
        longitude: -103.344,
    },
    {
        country: 'México',
        state: 'Jalisco',
        municipality: 'Zapopan',
        metroArea: 'Zona Metropolitana de Guadalajara',
        latitude: 20.7211,
        longitude: -103.3918,
    },
    {
        country: 'México',
        state: 'Ciudad de México',
        municipality: 'Cuauhtémoc',
        metroArea: 'Valle de México',
        latitude: 19.4326,
        longitude: -99.1332,
    },
    {
        country: 'México',
        state: 'Nuevo León',
        municipality: 'Monterrey',
        metroArea: 'Zona Metropolitana de Monterrey',
        latitude: 25.6866,
        longitude: -100.3161,
    },
    {
        country: 'México',
        state: 'Puebla',
        municipality: 'Puebla',
        metroArea: 'Zona Metropolitana de Puebla',
        latitude: 19.0414,
        longitude: -98.2063,
    },
    {
        country: 'México',
        state: 'Querétaro',
        municipality: 'Querétaro',
        metroArea: 'Zona Metropolitana de Querétaro',
        latitude: 20.5888,
        longitude: -100.3899,
    },
    {
        country: 'México',
        state: 'Guanajuato',
        municipality: 'León',
        metroArea: 'Zona Metropolitana de León',
        latitude: 21.1222,
        longitude: -101.6821,
    },
    {
        country: 'México',
        state: 'Yucatán',
        municipality: 'Mérida',
        metroArea: 'Zona Metropolitana de Mérida',
        latitude: 20.9674,
        longitude: -89.5926,
    },
];

const STRUCTURE_TYPES: SiteStructureType[] = [
    'billboard',
    'digital',
    'mupi',
    'bus_shelter',
    'wall',
];

const STATUSES: SiteStatus[] = [
    'available',
    'occupied',
    'maintenance',
    'inactive',
];

const STREET_ORIENTATIONS = [
    'Norte',
    'Sur',
    'Oriente',
    'Poniente',
    'Noreste',
    'Noroeste',
    'Sureste',
    'Suroeste',
];

const SPOT_DURATIONS = [
    5,
    10,
    15,
    20,
    30,
];

export function generateSites(
    count = 40000,
): Site[] {
    faker.seed(2026);

    return Array.from(
        { length: count },
        (_, index): Site => {
            const owner = faker.helpers.arrayElement(OWNERS);

            const location =
                faker.helpers.arrayElement(LOCATIONS);

            const structureType =
                faker.helpers.arrayElement(
                    STRUCTURE_TYPES,
                );

            /*
             * Para el prototipo asumimos que una
             * estructura digital utiliza publicidad
             * digital; el resto utiliza publicidad
             * estática.
             */
            const adType: AdType =
                structureType === 'digital'
                    ? 'digital'
                    : 'static';

            const spotDurationSeconds =
                adType === 'digital'
                    ? faker.helpers.arrayElement(
                        SPOT_DURATIONS,
                    )
                    : undefined;

            const spotsPerHour =
                spotDurationSeconds
                    ? Math.floor(
                        3600 / spotDurationSeconds,
                    )
                    : undefined;

            return {
                id: `SIT-${String(index + 1).padStart(
                    6,
                    '0',
                )}`,

                identification: {
                    name: faker.location.street(),

                    owner: {
                        id: owner.id,
                        name: owner.name,
                    },
                },

                location: {
                    latitude:
                        location.latitude +
                        faker.number.float({
                            min: -0.08,
                            max: 0.08,
                            fractionDigits: 6,
                        }),

                    longitude:
                        location.longitude +
                        faker.number.float({
                            min: -0.08,
                            max: 0.08,
                            fractionDigits: 6,
                        }),

                    country: location.country,
                    state: location.state,
                    municipality: location.municipality,
                    metroArea: location.metroArea,

                    address: `${faker.location.streetAddress()}`,

                    references: faker.helpers.maybe(
                        () =>
                            `Cerca de ${faker.location.street()}`,
                        {
                            probability: 0.65,
                        },
                    ),
                },

                structure: {
                    type: structureType,

                    faces: faker.number.int({
                        min: 1,
                        max: 4,
                    }),

                    height: faker.number.float({
                        min: 1.5,
                        max: 15,
                        fractionDigits: 1,
                    }),

                    width: faker.number.float({
                        min: 1,
                        max: 20,
                        fractionDigits: 1,
                    }),

                    diameter:
                        structureType === 'mupi'
                            ? faker.number.float({
                                min: 0.5,
                                max: 2,
                                fractionDigits: 1,
                            })
                            : undefined,

                    illuminated:
                        faker.datatype.boolean(),

                    streetFacing:
                        faker.datatype.boolean(),

                    streetOrientation:
                        faker.helpers.arrayElement(
                            STREET_ORIENTATIONS,
                        ),

                    visibilityBlocked:
                        faker.datatype.boolean({
                            probability: 0.08,
                        }),
                },

                commercial: {
                    adType,
                    spotDurationSeconds,
                    spotsPerHour,
                },

                status:
                    faker.helpers.arrayElement(STATUSES),

                updatedAt:
                    faker.date
                        .recent({
                            days: 90,
                        })
                        .toISOString(),
            };
        },
    );
}