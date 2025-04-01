/*
// composables/useApi.ts
import type { UseFetchOptions } from '#app'

export const useApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

    const fetchOptions: UseFetchOptions<unknown> = {
        baseURL: baseUrl,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return {
        get: <T>(endpoint: string, options?: UseFetchOptions<T>) => {
            return useFetch<T>(endpoint, {
                ...fetchOptions,
                ...options,
                method: 'GET'
            })
        },

        post: <T>(endpoint: string, body?: any, options?: UseFetchOptions<T>) => {
            return useFetch<T>(endpoint, {
                ...fetchOptions,
                ...options,
                method: 'POST',
                body
            })
        },

        put: <T>(endpoint: string, body?: any, options?: UseFetchOptions<T>) => {
            return useFetch<T>(endpoint, {
                ...fetchOptions,
                ...options,
                method: 'PUT',
                body
            })
        },

        delete: <T>(endpoint: string, options?: UseFetchOptions<T>) => {
            return useFetch<T>(endpoint, {
                ...fetchOptions,
                ...options,
                method: 'DELETE'
            })
        }
    }
}
*/
