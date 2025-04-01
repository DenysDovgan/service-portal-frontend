export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    ADMIN: 'Admin',
    CLIENT: 'Client',
    TECHNICIAN: 'Technician',
    SERVICE_MANAGER: 'Service Manager'
  }

  return roleMap[role] || role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}