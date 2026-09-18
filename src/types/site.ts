export type SiteStatus =
    | 'available'
    | 'occupied'
    | 'maintenance'
    | 'inactive';

export type SiteStructureType =
    | 'billboard'
    | 'digital'
    | 'mupi'
    | 'bus_shelter'
    | 'wall';

export type AdType =
    | 'static'
    | 'digital';

export interface Site {
    id: string;

    identification: {
        name: string;

        owner: {
            id: string;
            name: string;
        };
    };

    location: {
        latitude: number;
        longitude: number;

        country: string;
        state: string;
        municipality: string;
        metroArea: string;

        address: string;
        references?: string;
    };

    structure: {
        type: SiteStructureType;

        faces: number;

        height: number;
        width: number;

        diameter?: number;

        illuminated: boolean;

        streetFacing: boolean;
        streetOrientation?: string;

        visibilityBlocked: boolean;
    };

    commercial: {
        adType: AdType;

        spotDurationSeconds?: number;
        spotsPerHour?: number;
    };

    status: SiteStatus;

    updatedAt: string;
}