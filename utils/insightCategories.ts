import type { InsightsResponse } from '~/types/insights'

export const insightCategories: Partial<Record<keyof InsightsResponse, string>> = {
  // General Issues
  totalIssuesCount: 'Issues',
  openIssuesCount: 'Issues',
  inProgressIssuesCount: 'Issues',
  resolvedIssuesCount: 'Issues',
  closedIssuesCount: 'Issues',

  // User Roles
  totalUsersCount: 'Users',
  totalAdminsCount: 'Users',
  totalServiceManagersCount: 'Users',
  totalTechniciansCount: 'Users',
  totalClientsCount: 'Users',

  // Role-Specific
  staffMyAssignedIssuesCount: 'My Issues',
  staffMyOpenIssuesCount: 'My Issues',
  staffMyInProgressIssuesCount: 'My Issues',
  staffMyResolvedIssuesCount: 'My Issues',
  staffMyClosedIssuesCount: 'My Issues',

  clientMyTotalIssuesCount: 'My Issues',
  clientMyOpenedIssuesCount: 'My Issues',
  clientMyInProgressIssuesCount: 'My Issues',
  clientMyResolvedIssuesCount: 'My Issues'
}
