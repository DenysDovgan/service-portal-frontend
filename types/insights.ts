export interface InsightsResponse {
    // Issues
    totalIssuesCount: number
    openIssuesCount: number
    inProgressIssuesCount: number
    resolvedIssuesCount: number
    closedIssuesCount: number

    // Users
    totalUsersCount: number
    totalAdminsCount: number
    totalServiceManagersCount: number
    totalTechniciansCount: number
    totalClientsCount: number

    // Staff insights
    staffMyAssignedIssuesCount: number
    staffMyOpenIssuesCount: number
    staffMyInProgressIssuesCount: number
    staffMyResolvedIssuesCount: number
    staffMyClosedIssuesCount: number

    // Client insights
    clientMyTotalIssuesCount: number
    clientMyOpenedIssuesCount: number
    clientMyInProgressIssuesCount: number
    clientMyResolvedIssuesCount: number
}