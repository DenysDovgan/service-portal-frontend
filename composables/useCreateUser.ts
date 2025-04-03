import { formatToLowerCase } from '~/utils/format'
import type { UserFormSchema } from '~/schemas/userSchema'

export const useCreateUser = () => {
    const loading = ref(false)
    const toast = useToast()
    const { token } = useAuth()
    const config = useRuntimeConfig()

    const createUser = async (data: UserFormSchema) => {
        loading.value = true

        const body = {
            ...data,
            firstName: formatToLowerCase(data.firstName),
            lastName: formatToLowerCase(data.lastName),
            city: formatToLowerCase(data.city),
            country: formatToLowerCase(data.country),
            companyName: formatToLowerCase(data.companyName),
        }

        try {
            await $fetch('/users/create', {
                baseURL: config.public.apiBaseUrl,
                method: 'POST',
                headers: {
                    Authorization: `${token.value}`
                },
                body
            })
            toast.add({ title: 'User created successfully', color: 'success' })
            return true
        } catch (error) {
            toast.add({ title: 'Failed to create user', color: 'error' })
            return false
        } finally {
            loading.value = false
        }
    }

    return { createUser, loading }
}
