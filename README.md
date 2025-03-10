# Teamwork MCP

An MCP server that connects to the Teamwork API, providing a simplified interface for interacting with Teamwork projects and tasks.

## Features

- Connect to Teamwork API
- Retrieve projects and tasks
- Create, update, and delete tasks
- RESTful API endpoints
- Error handling and logging
- MCP server for integration with Cursor and other applications

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Teamwork account with API access

## Installation

1. Clone the repository:

```
git clone https://github.com/readingdancer/teamwork-mcp.git
cd teamwork-mcp
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file based on the `.env.example` file:

```
cp .env.example .env
```

4. Update the `.env` file with your Teamwork credentials.

## Configuration

Edit the `.env` file to configure the application:

- `PORT`: The port on which the server will run (default: 3000)
- `NODE_ENV`: The environment (development, production, test)
- `LOG_LEVEL`: Logging level (info, error, debug)
- `TEAMWORK_DOMAIN`: Your Teamwork domain name (e.g., "your-company" for https://your-company.teamwork.com)
- `TEAMWORK_USERNAME`: Your Teamwork username (email)
- `TEAMWORK_PASSWORD`: Your Teamwork password

### Setting Credentials

You can provide your Teamwork credentials in three ways:

1. **Environment Variables**: Set `TEAMWORK_DOMAIN`, `TEAMWORK_USERNAME`, and `TEAMWORK_PASSWORD` in your environment.

2. **.env File**: Create a `.env` file with the required variables as shown above.

3. **Command Line Arguments**: Pass credentials when running the application:
   ```
   node build/index.js --teamwork-domain=your-company --teamwork-username=your-email@example.com --teamwork-password=your-password
   ```
   
   Or using short form:
   ```
   node build/index.js --domain=your-company --user=your-email@example.com --pass=your-password
   ```

### Tool Filtering

You can control which tools are available to the MCP server using the following command-line arguments:

1. **Allow List**: Only expose specific tools:
   ```
   node build/index.js --allow-tools=getProjects,getTasks,getTaskById
   ```
   
   Or using short form:
   ```
   node build/index.js --allow=getProjects,getTasks,getTaskById
   ```

2. **Deny List**: Expose all tools except those specified:
   ```
   node build/index.js --deny-tools=deleteTask,updateTask
   ```
   
   Or using short form:
   ```
   node build/index.js --deny=deleteTask,updateTask
   ```

By default, all tools are exposed if neither allow nor deny list is provided. If both are provided, the allow list takes precedence.

The tool filtering is enforced at two levels for enhanced security:
1. When listing available tools (tools not in the allow list or in the deny list won't be visible)
2. When executing tool calls (attempts to call filtered tools will be rejected with an error)

## Usage

### Building the application

Build the application:

```
npm run build
```

This will compile the TypeScript code ready to be used as an MCP Server

### Running as an MCP Server

To run as an MCP server for integration with Cursor and other applications, if you are using the .env file for your username, password & url, or if you have saved them in environment variables:

```
node build/index.js
```

Or you can pass them using line arguments:

```
node build/index.js --teamwork-domain=your-company --teamwork-username=your-email@example.com --teamwork-password=your-password
```

You can also use the short form:

```
node build/index.js --domain=your-company --user=your-email@example.com --pass=your-password
```

### Using the MCP Inspector

To run the MCP inspector for debugging:

```
npm run inspector
```

### Adding to Cursor

To add this MCP server to Cursor:

1. Open Cursor Settings > Features > MCP
2. Click "+ Add New MCP Server"
3. Enter a name for the server (e.g., "Teamwork API")
4. Select "stdio" as the transport type
5. Enter the command to run the server: `node path/to/teamwork-mcp/build/index.js` and then if needed, add the command line arguments as mentioned above.
   - You can include tool filtering options: `--allow=getProjects,getTasks` or `--deny=deleteTask`
6. Click "Add"

The Teamwork MCP tools will now be available to the Cursor Agent in Composer.

### Available Teamwork MCP Tools

The following tools are available through the MCP server:

#### Project Tools

- `getCurrentProject` - Gets details about the current project (if you have setup your `.teamwork` settings file, see below.)
- `getProjects` - Get all projects from Teamwork
- `createProject` - Create a new project in Teamwork

#### Task Tools

- `getTasks` - Get all tasks from Teamwork
- `getTaskById` - Get a specific task by ID from Teamwork
- `getTasksByProjectId` - Get all tasks from a specific project in Teamwork
- `getTaskListsByProjectId` - Get all task lists from a specific project in Teamwork
- `getTasksByTaskListId` - Get all tasks from a specific task list in Teamwork
- `getTaskSubtasks` - Get all subtasks for a specific task in Teamwork
- `getTasksMetricsComplete` - Get the total count of completed tasks in Teamwork
- `getTasksMetricsLate` - Get the total count of late tasks in Teamwork
- `createTask` - Create a new task in Teamwork
- `createSubTask` - Create a new subtask under a parent task in Teamwork
- `updateTask` - Update an existing task in Teamwork
- `deleteTask` - Delete a task from Teamwork

#### People Tools

- `getPeople` - Get all people from Teamwork
- `getPersonById` - Get a specific person by ID from Teamwork
- `getProjectPeople` - Get all people assigned to a specific project from Teamwork
- `addPeopleToProject` - Add people to a specific project in Teamwork
- `deletePerson` - Delete a person from Teamwork

## Setting Up Your Teamwork Project

To associate your current solution with a Teamwork project, you can use the following method:

### Using a Configuration File

You can create a `.teamwork` file in the root of your project with the following structure:

```
PROJECT_ID = YourTeamworkProjectID
```

This simple configuration file associates your solution with a specific Teamwork project, we may use it to store more details in the future.

Once configured, the MCP will be able to find your Teamwork project and associate it with your current solution, reducing the number of API calls needed to get the project and tasks related to the solution you are working on.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
