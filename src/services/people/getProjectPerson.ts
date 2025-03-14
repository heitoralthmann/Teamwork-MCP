import { getApiClientForVersion } from '../core/apiClient.js';

interface GetProjectPersonParams {
  projectId: number;
  personId: number;
  userType?: 'account' | 'collaborator' | 'contact';
  updatedAfter?: string;
  searchTerm?: string;
  orderMode?: 'asc' | 'desc';
  orderBy?: 'name' | 'namecaseinsensitive' | 'company';
  lastLoginAfter?: string;
  pageSize?: number;
  page?: number;
  skipCounts?: boolean;
  showDeleted?: boolean;
  searchUserJobRole?: boolean;
  orderPrioritiseCurrentUser?: boolean;
  onlySiteOwner?: boolean;
  onlyOwnerCompany?: boolean;
  inclusiveFilter?: boolean;
  includeServiceAccounts?: boolean;
  includePlaceholders?: boolean;
  includeCollaborators?: boolean;
  includeClients?: boolean;
  filterByNoCostRate?: boolean;
  excludeContacts?: boolean;
  teamIds?: number[];
  projectIds?: number[];
  include?: string[];
  ids?: number[];
  'fields[teams]'?: string[];
  'fields[person]'?: string[];
  'fields[people]'?: string[];
  'fields[companies]'?: string[];
  'fields[ProjectPermissions]'?: string[];
  excludeProjectIds?: number[];
  excludeIds?: number[];
  companyIds?: number[];
}

export async function getProjectPerson(params: GetProjectPersonParams) {
  const api = getApiClientForVersion('v3');
  const response = await api.get(`/projects/${params.projectId}/people/${params.personId}.json`, { params });
  return response.data;
}

export default getProjectPerson; 