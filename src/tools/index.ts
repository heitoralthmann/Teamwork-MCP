/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

// Projects
import { getProjectsDefinition as getProjects, handleGetProjects } from './projects/getProjects.js';
import { getCurrentProjectDefinition as getCurrentProject, handleGetCurrentProject } from './projects/getCurrentProject.js';
import { createProjectDefinition as createProject, handleCreateProject } from './projects/createProject.js';

// Tasks
import { getTasksDefinition as getTasks, handleGetTasks } from './tasks/getTasks.js';
import { getTasksByProjectIdDefinition as getTasksByProjectId, handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
import { getTaskListsByProjectIdDefinition as getTaskListsByProjectId, handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js';
import { getTaskByIdDefinition as getTaskById, handleGetTaskById } from './tasks/getTaskById.js';
import { createTaskDefinition as createTask, handleCreateTask } from './tasks/createTask.js';
import { createSubTaskDefinition as createSubTask, handleCreateSubTask } from './tasks/createSubTask.js';
import { updateTaskDefinition as updateTask, handleUpdateTask } from './tasks/updateTask.js';
import { deleteTaskDefinition as deleteTask, handleDeleteTask } from './tasks/deleteTask.js';
import { getTasksMetricsCompleteDefinition as getTasksMetricsComplete, handleGetTasksMetricsComplete } from './tasks/getTasksMetricsComplete.js';
import { getTasksMetricsLateDefinition as getTasksMetricsLate, handleGetTasksMetricsLate } from './tasks/getTasksMetricsLate.js';
import { getTaskSubtasksDefinition as getTaskSubtasks, handleGetTaskSubtasks } from './tasks/getTaskSubtasks.js';
import { getTaskCommentsDefinition as getTaskComments, handleGetTaskComments } from './tasks/getTaskComments.js';

// Comments
import { createCommentDefinition as createComment, handleCreateComment } from './comments/createComment.js';

// People
import { getPeopleDefinition as getPeople, handleGetPeople } from './people/getPeople.js';
import { getPersonByIdDefinition as getPersonById, handleGetPersonById } from './people/getPersonById.js';
import { getProjectPeopleDefinition as getProjectPeople, handleGetProjectPeople } from './people/getProjectPeople.js';
import { addPeopleToProjectDefinition as addPeopleToProject, handleAddPeopleToProject } from './people/addPeopleToProject.js';
import { deletePersonDefinition as deletePerson, handleDeletePerson } from './people/deletePerson.js';

// Reporting
import { getProjectsPeopleMetricsPerformanceDefinition as getProjectsPeopleMetricsPerformance, handleGetProjectsPeopleMetricsPerformance } from './people/getPeopleMetricsPerformance.js';
import { getProjectsPeopleUtilizationDefinition as getProjectsPeopleUtilization, handleGetProjectsPeopleUtilization } from './people/getPeopleUtilization.js';
import { getProjectPersonDefinition as getProjectPerson, handleGetProjectPerson } from './people/getProjectPerson.js';
import { getProjectsReportingUserTaskCompletionDefinition as getProjectsReportingUserTaskCompletion, handleGetProjectsReportingUserTaskCompletion } from './reporting/getUserTaskCompletion.js';
import { getProjectsReportingUtilizationDefinition as getProjectsReportingUtilization, handleGetProjectsReportingUtilization } from './people/getUtilization.js';

// Time-related imports
import { getTimeDefinition as getTime, handleGetTime } from './time/getTime.js';
import { getProjectsAllocationsTimeDefinition as getAllocationTime, handleGetProjectsAllocationsTime } from './time/getAllocationTime.js';

// Define a structure that pairs tool definitions with their handlers
interface ToolPair {
  definition: any;
  handler: Function;
}

// Create an array of tool pairs
const toolPairs: ToolPair[] = [
  { definition: getProjects, handler: handleGetProjects },
  { definition: getCurrentProject, handler: handleGetCurrentProject },
  { definition: createProject, handler: handleCreateProject },
  { definition: getTasks, handler: handleGetTasks },
  { definition: getTasksByProjectId, handler: handleGetTasksByProjectId },
  { definition: getTaskListsByProjectId, handler: handleGetTaskListsByProjectId },
  { definition: getTaskById, handler: handleGetTaskById },
  { definition: createTask, handler: handleCreateTask },
  { definition: createSubTask, handler: handleCreateSubTask },
  { definition: updateTask, handler: handleUpdateTask },
  { definition: deleteTask, handler: handleDeleteTask },
  { definition: getTasksMetricsComplete, handler: handleGetTasksMetricsComplete },
  { definition: getTasksMetricsLate, handler: handleGetTasksMetricsLate },
  { definition: getTaskSubtasks, handler: handleGetTaskSubtasks },
  { definition: getTaskComments, handler: handleGetTaskComments },
  { definition: createComment, handler: handleCreateComment },
  { definition: getPeople, handler: handleGetPeople },
  { definition: getPersonById, handler: handleGetPersonById },
  { definition: getProjectPeople, handler: handleGetProjectPeople },
  { definition: addPeopleToProject, handler: handleAddPeopleToProject },
  { definition: deletePerson, handler: handleDeletePerson },
  { definition: getProjectsPeopleMetricsPerformance, handler: handleGetProjectsPeopleMetricsPerformance },
  { definition: getProjectsPeopleUtilization, handler: handleGetProjectsPeopleUtilization },
  { definition: getAllocationTime, handler: handleGetProjectsAllocationsTime },
  { definition: getTime, handler: handleGetTime },
  { definition: getProjectPerson, handler: handleGetProjectPerson },
  { definition: getProjectsReportingUserTaskCompletion, handler: handleGetProjectsReportingUserTaskCompletion },
  { definition: getProjectsReportingUtilization, handler: handleGetProjectsReportingUtilization }
];

// Extract just the definitions for the toolDefinitions array
export const toolDefinitions = toolPairs.map(pair => pair.definition);

// Create a map of tool names to their handler functions
export const toolHandlersMap: Record<string, Function> = toolPairs.reduce((map, pair) => {
  map[pair.definition.name] = pair.handler;
  return map;
}, {} as Record<string, Function>);

// Export all tool handlers
export { handleGetProjects } from './projects/getProjects.js';
export { handleGetCurrentProject } from './projects/getCurrentProject.js';
export { handleCreateProject } from './projects/createProject.js';
export { handleGetTasks } from './tasks/getTasks.js';
export { handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
export { handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js';
export { handleGetTaskById } from './tasks/getTaskById.js';
export { handleCreateTask } from './tasks/createTask.js';
export { handleCreateSubTask } from './tasks/createSubTask.js';
export { handleUpdateTask } from './tasks/updateTask.js';
export { handleDeleteTask } from './tasks/deleteTask.js';
export { handleGetTasksMetricsComplete } from './tasks/getTasksMetricsComplete.js';
export { handleGetTasksMetricsLate } from './tasks/getTasksMetricsLate.js';
export { handleGetTaskSubtasks } from './tasks/getTaskSubtasks.js';
export { handleGetTaskComments } from './tasks/getTaskComments.js';
export { handleCreateComment } from './comments/createComment.js';
export { handleGetPeople } from './people/getPeople.js';
export { handleGetPersonById } from './people/getPersonById.js';
export { handleGetProjectPeople } from './people/getProjectPeople.js';
export { handleAddPeopleToProject } from './people/addPeopleToProject.js';
export { handleDeletePerson } from './people/deletePerson.js';
export { handleGetProjectsPeopleMetricsPerformance } from './people/getPeopleMetricsPerformance.js';
export { handleGetProjectsPeopleUtilization } from './people/getPeopleUtilization.js';
export { handleGetTime } from './time/getTime.js';
export { handleGetProjectsAllocationsTime } from './time/getAllocationTime.js';
export { handleGetProjectPerson } from './people/getProjectPerson.js';
export { handleGetProjectsReportingUserTaskCompletion } from './reporting/getUserTaskCompletion.js';
export { handleGetProjectsReportingUtilization } from './people/getUtilization.js'; 