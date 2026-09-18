export type UserRole =
    | 'media_owner'
    | 'agency'
    | 'brand';

export const USER_ROLE_LABELS: Record<UserRole, string> = {
    media_owner: 'Dueño de medios',
    agency: 'Agencia',
    brand: 'Marca',
};