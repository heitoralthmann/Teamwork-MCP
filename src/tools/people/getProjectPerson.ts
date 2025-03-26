import { getProjectPerson as getProjectPersonService } from '../../services/people/getProjectPerson.js';

export const getProjectPersonDefinition = {
  name: "getProjectPerson",
  description: "Returns a person on a project. Retrieve a person record.",
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'integer',
        description: 'Path parameter: projectId'
      },
      personId: {
        type: 'integer',
        description: 'Path parameter: personId'
      },
      userType: {
        type: 'string',
        description: 'user type',
        enum: [
          'account',
          'collaborator',
          'contact'
        ]
      },
      updatedAfter: {
        type: 'string',
        description: 'date time'
      },
      searchTerm: {
        type: 'string',
        description: 'filter by comment content'
      },
      orderMode: {
        type: 'string',
        description: 'order mode',
        enum: [
          'asc',
          'desc'
        ]
      },
      orderBy: {
        type: 'string',
        description: 'order by',
        enum: [
          'name',
          'namecaseinsensitive',
          'company'
        ]
      },
      lastLoginAfter: {
        type: 'string',
        description: 'Query parameter: lastLoginAfter'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page (not used when generating reports)'
      },
      page: {
        type: 'integer',
        description: 'page number (not used when generating reports)'
      },
      skipCounts: {
        type: 'boolean',
        description: 'SkipCounts allows you to skip doing counts on a list API endpoint for performance reasons.'
      },
      showDeleted: {
        type: 'boolean',
        description: 'include deleted items'
      },
      searchUserJobRole: {
        type: 'boolean',
        description: 'Include user job role in search'
      },
      orderPrioritiseCurrentUser: {
        type: 'boolean',
        description: 'Force to have the current/session user in the response'
      },
      onlySiteOwner: {
        type: 'boolean',
        description: 'Query parameter: onlySiteOwner'
      },
      onlyOwnerCompany: {
        type: 'boolean',
        description: 'return people only from the owner company. This will replace any provided company ID.'
      },
      inclusiveFilter: {
        type: 'boolean',
        description: 'make the filter inclusive for user ids, teamIds, companyIds'
      },
      includeServiceAccounts: {
        type: 'boolean',
        description: 'include service accounts'
      },
      includePlaceholders: {
        type: 'boolean',
        description: 'include placeholder users'
      },
      includeCollaborators: {
        type: 'boolean',
        description: 'exclude collaborators types, returning only account and contact.'
      },
      includeClients: {
        type: 'boolean',
        description: 'include clients'
      },
      filterByNoCostRate: {
        type: 'boolean',
        description: 'Returns users who are missing cost rates(OCA only)'
      },
      excludeContacts: {
        type: 'boolean',
        description: 'exclude contact types, returning only account and collaborator.'
      },
      teamIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'team ids'
      },
      projectIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by project ids'
      },
      include: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'include (not used when generating reports)'
      },
      ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by user ids'
      },
      'fields[teams]': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[teams]'
      },
      'fields[person]': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[person]'
      },
      'fields[people]': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[people]'
      },
      'fields[companies]': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[companies]'
      },
      'fields[ProjectPermissions]': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[ProjectPermissions]'
      },
      excludeProjectIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'exclude people assigned to certain project id'
      },
      excludeIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'exclude certain user ids'
      },
      companyIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'company ids'
      }
    },
    required: [
      'projectId',
      'personId'
    ]
  }
};

export async function handleGetProjectPerson(input: any) {
  try {
    const response = await getProjectPersonService(input);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return {
      content: [{
        type: "text",
        text: `Error: ${error.message}`
      }]
    };
  }
} 