/*
export const useInsights = async () => {
    const { data, error, pending } = await useFetch('/api/insights')

    return {
        insights: data,
        loading: pending,
        error,
    }
}
*/
export const useInsights = async () => {
    const userRole = useAuth().data.value?.role

    const mockData = computed(() => {
        switch (userRole) {
            case 'ADMIN':
                return {
                    totalIssues: 128,
                    openIssues: 37,
                    inProgressIssues: 24,
                    clients: 22,
                    technicians: 6,
                }
            case 'SERVICE_MANAGER':
                return {
                    totalIssues: 128,
                    openIssues: 37,
                    inProgressIssues: 24,
                    myIssues: 9,
                    clients: 22,
                    technicians: 6,
                }

            case 'TECHNICIAN':
                return {
                    myOpenIssues: 5,
                    myInProgressIssues: 3,
                    activeClient: 1,
                    totalAssigned: 14,
                }

            case 'CLIENT':
                return {
                    myOpenIssues: 2,
                    myInProgressIssues: 1,
                    myDoneIssues: 7,
                    totalIssues: 10,
                }

            default:
                return {}
        }
    })

    return {
        insights: mockData,
        loading: ref(false),
        error: ref(null),
    }
}
