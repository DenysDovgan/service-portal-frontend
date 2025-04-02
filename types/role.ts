export const Role = {
    CLIENT: 'CLIENT',
    TECHNICIAN: 'TECHNICIAN',
    SERVICE_MANAGER: 'SERVICE_MANAGER',
    ADMIN: 'ADMIN'
} as const

export type Role = (typeof Role)[keyof typeof Role]
