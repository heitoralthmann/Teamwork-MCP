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
- `TEAMWORK_API_URL`: Your Teamwork domain API URL (format: https://your-domain.teamwork.com/api/v3)
- `TEAMWORK_USERNAME`: Your Teamwork username (email)
- `TEAMWORK_PASSWORD`: Your Teamwork password

### Setting Credentials

You can provide your Teamwork credentials in three ways:

1. **Environment Variables**: Set `TEAMWORK_API_URL`, `TEAMWORK_USERNAME`, and `TEAMWORK_PASSWORD` in your environment.

2. **.env File**: Create a `.env` file with the required variables as shown above.

3. **Command Line Arguments**: Pass credentials when starting the application:

```
node build/index.js --teamwork-api-url=https://your-domain.teamwork.com/api/v3 --teamwork-username=your-email@example.com --teamwork-password=your-password
```

Or using the short form:

```
node build/index.js --url=https://your-domain.teamwork.com/api/v3 --user=your-email@example.com --pass=your-password
```

The application will check for credentials in the order: command line arguments, environment variables, .env file.

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
node build/index.js --teamwork-api-url=https://your-domain.teamwork.com/api/v3 --teamwork-username=your-email@example.com --teamwork-password=your-password
```

You can also use the short form:

```
node build/index.js --url=https://your-domain.teamwork.com/api/v3 --user=your-email@example.com --pass=your-password
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
6. Click "Add"

The Teamwork MCP tools will now be available to the Cursor Agent in Composer.

### Available Teamwork MCP Tools

The following tools are available through the MCP server:

- `getProjects` - Get all projects from Teamwork
- `getTasks` - Get all tasks from Teamwork
- `getTaskById` - Get a specific task by ID from Teamwork
- `getTasksByProjectId` - Get a list of task from a Project using the Teamwork Project ID
- `createTask` - Create a new task in Teamwork
- `updateTask` - Update an existing task in Teamwork
- `deleteTask` - Delete a task from Teamwork

## License

This project is licensed under the MIT License - see the LICENSE file for details.
