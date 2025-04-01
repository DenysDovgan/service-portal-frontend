import type { InsightsResponse } from '~/types/insights'
import {process} from "std-env";

export const useInsights = () => {
    const config = useRuntimeConfig()
    const insights = ref<InsightsResponse | null>(null)
    const pending = ref(false)
    const error = ref<Error | null>(null)

    const { token, data: session } = useAuth()
    const role = computed(() => session.value?.role ?? null)

    const fetchInsights = async () => {
        if (!token.value) {
            console.warn('[INSIGHTS] Token not ready. Skipping fetch.')
            return
        }

        pending.value = true
        error.value = null

        try {
            const { data: response } = await useFetch<{
                status: string
                message: string
                data: InsightsResponse
            }>('/insights', {
                baseURL: config.public.apiBaseUrl,
                headers: {
                    Authorization: `${token.value}`
                }
            })

            insights.value = response.value?.data ?? null
        } catch (err) {
            error.value = err as Error
            console.error('Failed to fetch insights:', err)
        } finally {
            pending.value = false
        }
    }

    // Trigger fetch only when token becomes available
    if (process.client) {
        watch(
            token,
            (val) => {
                if (val) fetchInsights()
            },
            { immediate: !!token.value }
        )
    }

    const filteredInsights = computed(() => {
        if (!insights.value) return null

        const result: Partial<InsightsResponse> = {}

        Object.entries(insights.value).forEach(([key, value]) => {
            result[key as keyof InsightsResponse] = value
        })

        return result
    })

    return {
        insights: filteredInsights,
        pending,
        error,
        refresh: fetchInsights
    }
}
