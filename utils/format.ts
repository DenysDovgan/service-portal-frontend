export const formatToLowerCase = (str: string): string => {
  return str.toLowerCase()
}

export const formatToUpperCase = (str: string): string => {
  return str.toUpperCase()
}
export const formatCapitalize = (str: string): string => {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    ADMIN: 'Admin',
    CLIENT: 'Client',
    TECHNICIAN: 'Technician',
    SERVICE_MANAGER: 'Service Manager'
  }

  return roleMap[role] || formatCapitalize(role)
}