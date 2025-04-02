import { Role } from '~/types/role';

export const useHasRole = (roles: Role[]) => {
  const { data } = useAuth()
  return computed(() => roles.includes(<Role>data.value?.role || ''))
}
