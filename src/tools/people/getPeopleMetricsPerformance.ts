import { getPeopleMetricsPerformance } from '../../services/people/getPeopleMetricsPerformance.js';

export const getProjectsPeopleMetricsPerformance = {
  name: "getProjectsPeopleMetricsPerformance",
  description: "Performance of users completing the most tasks. Count the number of completed tasks by user for the provided period. By default the user with the most completed tasks is shown first.",
  inputSchema: {
    type: 'object',
    properties: {
      startDate: {
        type: 'string',
        description: 'Start date for the performance metrics period'
      },
      endDate: {
        type: 'string',
        description: 'End date for the performance metrics period'
      },
      orderMode: {
        type: 'string',
        description: 'Order mode for sorting results',
        enum: [
          'asc',
          'desc'
        ]
      }
    }
  }
};

export async function handlegetProjectsPeopleMetricsPerformance(input: any) {
  try {
    const response = await getPeopleMetricsPerformance(input);
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