import type { Role } from '~/types/role'

export interface UserDto {
    id: number
    email: string
    phoneNumber: string
    firstName: string
    lastName: string
    city: string
    country: string
    companyName: string
    role: Role
}
