export enum Role {
    CLIENT = 'CLIENT',
    TECHNICIAN = 'TECHNICIAN',
    SERVICE_MANAGER = 'SERVICE_MANAGER',
    ADMIN = 'ADMIN',
}

export enum IssueStatus {
    DRAFT = 'DRAFT',
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    role: Role
}

export interface Issue {
    id: number
    title: string
    description: string
    status: IssueStatus
    createdAt: string
    updatedAt: string
    createdBy?: User
}
