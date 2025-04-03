import type { LoginSchema } from '~/schemas/loginSchema'

export const useLogin = () => {
    const { signIn } = useAuth()
    const toast = useToast()

    const loginError = ref<string>('')

    const login = async (credentials: LoginSchema): Promise<boolean> => {
        loginError.value = ''
        try {
            const result = await signIn(credentials, { redirect: false })

            if (result?.error) {
                throw new Error(result.error)
            }

            toast.add({ title: 'Logged In Successfully', color: 'success' })
            await navigateTo('/dashboard')
            return true
        } catch (error: unknown) {
            loginError.value = formatAuthError(error)
            toast.add({ title: 'Log In Failed', description: loginError.value, color: 'error' })
            return false
        }
    }

    function formatAuthError(error: unknown): string {
        if (typeof error === 'object' && error !== null) {
            const authError = error as { message?: string; statusCode?: number }

            if (authError.statusCode === 401) return 'Invalid email or password'
            if (authError.message?.includes('CredentialsSignin')) return 'Authentication failed'
            return 'Login failed. Please try again.'
        }
        return 'An unexpected error occurred'
    }

    return {
        login,
        loginError,
    }
}
