import { faker } from '@faker-js/faker';
import type {
    Site,
    SiteStatus,
    SiteStructureType,
} from '../types/site';

const owners = [
    { id: 'OWN-001', name: 'Grupo Vallas del Norte' },
    { id: 'OWN-002', name: 'Publimedios Occidente' },
    { id: 'OWN-003', name: 'OOH Metropolitano' },
    { id: 'OWN-004', name: 'Espacios Urbanos' },
    { id: 'OWN-005', name: 'Red Exterior Bajío' },
];

const locations = [
    {
        municipality: 'Cuauhtémoc',
        state: 'Ciudad de México',
        metroArea: 'Valle de México',
        latitude: 19.4326,
        longitude: -99.1332,
    },
    {
        municipality: 'Guadalajara',
        state: 'Jalisco',
        metroArea: 'Guadalajara',
        latitude: 20.6736,
        longitude: -103.344,
    },
    {
        municipality: 'Monterrey',
        state: 'Nuevo León',
        metroArea: 'Monterrey',
        latitude: 25.6866,
        longitude: -100.3161,
    },
    {
        municipality: 'Puebla',
        state: 'Puebla',
        metroArea: 'Puebla–Tlaxcala',
        latitude: 19.0414,
        longitude: -98.2063,
    },
    {
        municipality: 'Querétaro',
        state: 'Querétaro',
        metroArea: 'Querétaro',
        latitude: 20.5888,
        longitude: -100.3899,
    },
    {
        municipality: 'León',
        state: 'Guanajuato',
        metroArea: 'León',
        latitude: 21.122,
        longitude: -101.682,
    },
    {
        municipality: 'Mérida',
        state: 'Yucatán',
        metroArea: 'Mérida',
        latitude: 20.9674,
        longitude: -89.5926,
    },
    {
        municipality: 'Tijuana',
        state: 'Baja California',
        metroArea: 'Tijuana',
        latitude: 32.5149,
        longitude: -117.0382,
    },
];

const structureTypes: SiteStructureType[] = [
    'billboard',
    'digital',
    'mupi',
    'bus_shelter',
    'wall',
];

const statuses: SiteStatus[] = [
    'available',
    'occupied',
    'maintenance',
    'inactive',
];

const orientations = [
    'Norte',
    'Sur',
    'Este',
    'Oeste',
    'Noreste',
    'Noroeste',
    'Sureste',
    'Suroeste',
];

const referenceDate = Date.UTC(2026, 8, 17);
const dayInMilliseconds = 24 * 60 * 60 * 1000;

export function generateSites(count = 40000): Site[] {
    faker.seed(2026);

    return Array.from({ length: count }, (_, index): Site => {
        const location = faker.helpers.arrayElement(locations);
        const owner = faker.helpers.arrayElement(owners);
        const type = faker.helpers.arrayElement(structureTypes);

        const isDigital = type === 'digital';
        const streetFacing = faker.datatype.boolean();

        const number = String(index + 1).padStart(6, '0');
        const street = faker.location.street();
        const streetNumber = faker.number.int({
            min: 1,
            max: 999,
        });

        const daysAgo = faker.number.int({
            min: 0,
            max: 90,
        });

        return {
            id: `SIT-${number}`,

            identification: {
                name: `${street} ${streetNumber}`,
                owner: { ...owner },
            },

            location: {
                country: 'México',
                state: location.state,
                municipality: location.municipality,
                metroArea: location.metroArea,

                address: `${street} ${streetNumber}`,

                references: faker.helpers.arrayElement([
                    'Frente a plaza comercial',
                    'Junto a estación de transporte',
                    'A un costado de avenida principal',
                    'Cerca de cruce semaforizado',
                ]),

                // Coordenadas simuladas alrededor del centro.
                // No representan ubicaciones reales verificadas.
                latitude: faker.location.latitude({
                    min: location.latitude - 0.005,
                    max: location.latitude + 0.005,
                }),

                longitude: faker.location.longitude({
                    min: location.longitude - 0.005,
                    max: location.longitude + 0.005,
                }),
            },

            structure: {
                type,

                faces: type === 'wall'
                    ? 1
                    : faker.number.int({ min: 1, max: 2 }),

                height: faker.number.float({
                    min: 1,
                    max: 8,
                    fractionDigits: 1,
                }),

                width: faker.number.float({
                    min: 2,
                    max: 15,
                    fractionDigits: 1,
                }),

                illuminated: isDigital || faker.datatype.boolean(),

                streetFacing,

                ...(streetFacing
                    ? {
                        streetOrientation:
                            faker.helpers.arrayElement(orientations),
                    }
                    : {}),

                visibilityBlocked: faker.datatype.boolean(),
            },

            commercial: isDigital
                ? {
                    adType: 'digital',

                    spotDurationSeconds:
                        faker.helpers.arrayElement([10, 15, 20, 30]),

                    spotsPerHour:
                        faker.helpers.arrayElement([30, 60, 90, 120]),
                }
                : {
                    adType: 'static',
                },

            status: faker.helpers.arrayElement(statuses),

            updatedAt: new Date(
                referenceDate - daysAgo * dayInMilliseconds,
            ).toISOString(),
        };
    });
}