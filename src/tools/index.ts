/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

import { getProjectsDefinition as getProjects, handleGetProjects } from './projects/getProjects.js';
import { getCurrentProjectDefinition as getCurrentProject, handleGetCurrentProject } from './projects/getCurrentProject.js';
import { createProjectDefinition as createProject, handleCreateProject } from './projects/createProject.js';
import { getTasksDefinition as getTasks, handleGetTasks } from './tasks/getTasks.js';
import { getTasksByProjectIdDefinition as getTasksByProjectId, handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
import { getTaskListsByProjectIdDefinition as getTaskListsByProjectId, handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js';
import { getTaskByIdDefinition as getTaskById, handleGetTaskById } from './tasks/getTaskById.js';
import { createTaskDefinition as createTask, handleCreateTask } from './tasks/createTask.js';
import { createSubTaskDefinition as createSubTask, handleCreateSubTask } from './tasks/createSubTask.js';
import { updateTaskDefinition as updateTask, handleUpdateTask } from './tasks/updateTask.js';
import { deleteTaskDefinition as deleteTask, handleDeleteTask } from './tasks/deleteTask.js';
import { getTasksMetricsCompleteDefinition, handleGetTasksMetricsComplete } from './tasks/getTasksMetricsComplete.js';
import { getTasksMetricsLateDefinition, handleGetTasksMetricsLate } from './tasks/getTasksMetricsLate.js';
import { getTaskSubtasksDefinition, handleGetTaskSubtasks } from './tasks/getTaskSubtasks.js';
import { getPeopleDefinition as getPeople, handleGetPeople } from './people/getPeople.js';
import { getPersonByIdDefinition as getPersonById, handleGetPersonById } from './people/getPersonById.js';
import { getProjectPeopleDefinition as getProjectPeople, handleGetProjectPeople } from './people/getProjectPeople.js';
import { addPeopleToProjectDefinition as addPeopleToProject, handleAddPeopleToProject } from './people/addPeopleToProject.js';
import { deletePersonDefinition as deletePerson, handleDeletePerson } from './people/deletePerson.js';
import { getProjectsPeopleMetricsPerformance, handlegetProjectsPeopleMetricsPerformance } from './people/getPeopleMetricsPerformance.js';
import { getProjectsPeopleUtilization, handlegetProjectsPeopleUtilization } from './people/getPeopleUtilization.js';
import { getProjectsProjectsProjectIdPeoplePersonId, handlegetProjectsProjectsProjectIdPeoplePersonId } from './people/getProjectPerson.js';
import { getProjectsReportingPrecannedUsertaskcompletionUserId, handlegetProjectsReportingPrecannedUsertaskcompletionUserId } from './reporting/getUserTaskCompletion.js';
import { getProjectsReportingPrecannedUtilization, handlegetProjectsReportingPrecannedUtilization } from './people/getUtilization.js';

// Time-related imports
import { getTime, handleGetTime } from './time/getTime.js';
import { getProjectsAllocationsAllocationIdTime as getAllocationTimeDefinition, handlegetProjectsAllocationsAllocationIdTime } from './time/getAllocationTime.js';
import { getTaskComments, handleGetTaskComments } from './tasks/getTaskComments.js';

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
  { definition: getTasksMetricsCompleteDefinition, handler: handleGetTasksMetricsComplete },
  { definition: getTasksMetricsLateDefinition, handler: handleGetTasksMetricsLate },
  { definition: getTaskSubtasksDefinition, handler: handleGetTaskSubtasks },
  { definition: getTaskComments, handler: handleGetTaskComments },
  { definition: getPeople, handler: handleGetPeople },
  { definition: getPersonById, handler: handleGetPersonById },
  { definition: getProjectPeople, handler: handleGetProjectPeople },
  { definition: addPeopleToProject, handler: handleAddPeopleToProject },
  { definition: deletePerson, handler: handleDeletePerson },
  { definition: getProjectsPeopleMetricsPerformance, handler: handlegetProjectsPeopleMetricsPerformance },
  { definition: getProjectsPeopleUtilization, handler: handlegetProjectsPeopleUtilization },
  { definition: getAllocationTimeDefinition, handler: handlegetProjectsAllocationsAllocationIdTime },
  { definition: getTime, handler: handleGetTime },
  { definition: getProjectsProjectsProjectIdPeoplePersonId, handler: handlegetProjectsProjectsProjectIdPeoplePersonId },
  { definition: getProjectsReportingPrecannedUsertaskcompletionUserId, handler: handlegetProjectsReportingPrecannedUsertaskcompletionUserId },
  { definition: getProjectsReportingPrecannedUtilization, handler: handlegetProjectsReportingPrecannedUtilization }
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
export { handleGetPeople } from './people/getPeople.js';
export { handleGetPersonById } from './people/getPersonById.js';
export { handleGetProjectPeople } from './people/getProjectPeople.js';
export { handleAddPeopleToProject } from './people/addPeopleToProject.js';
export { handleDeletePerson } from './people/deletePerson.js';
export { handlegetProjectsPeopleMetricsPerformance } from './people/getPeopleMetricsPerformance.js';
export { handlegetProjectsPeopleUtilization } from './people/getPeopleUtilization.js';
export { handleGetTime } from './time/getTime.js';
export { handlegetProjectsAllocationsAllocationIdTime } from './time/getAllocationTime.js';
export { handlegetProjectsProjectsProjectIdPeoplePersonId } from './people/getProjectPerson.js';
export { handlegetProjectsReportingPrecannedUsertaskcompletionUserId } from './reporting/getUserTaskCompletion.js';
export { handlegetProjectsReportingPrecannedUtilization } from './people/getUtilization.js'; 