import type { InsightsResponse } from '~/types/insights'

export const useInsights = () => {
    const config = useRuntimeConfig()
    const insights = ref<InsightsResponse | null>(null)
    const pending = ref(false)
    const error = ref<Error | null>(null)

    const { token, getSession, data: session } = useAuth()
    const role = computed(() => session.value?.role ?? null)

    const fetchInsights = async () => {
        if (!token.value) {
            console.warn('[INSIGHTS] Token not ready. Skipping fetch.')
            return
        }

        pending.value = true
        error.value = null

        try {
            const { data } = await useFetch<{
                status: string
                message: string
                data: InsightsResponse
            }>('/insights', {
                baseURL: config.public.apiBaseUrl,
                headers: {
                    Authorization: `${token.value}`
                }
            })

            insights.value = data.value?.data ?? null
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
        if (!insights.value || !role.value) return null

        const result: Partial<InsightsResponse> = {}

        Object.entries(insights.value).forEach(([key, value]) => {
            if (
                key.startsWith('total') ||
                key.startsWith('open') ||
                key.startsWith('closed') ||
                key.startsWith('resolved')
            ) {
                result[key as keyof InsightsResponse] = value
            } else if (key.startsWith('staff') && role.value !== 'CLIENT') {
                result[key as keyof InsightsResponse] = value
            } else if (key.startsWith('client') && role.value === 'CLIENT') {
                result[key as keyof InsightsResponse] = value
            }
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
