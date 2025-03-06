# Teamwork API Connector

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
   git clone https://github.com/readingdancer/teamwork-api-connector.git
   cd teamwork-api-connector
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
- `TEAMWORK_API_URL`: Your Teamwork domain API URL (format: https://your-domain.teamwork.com/projects/api/v3/)
- `TEAMWORK_USERNAME`: Your Teamwork username (email)
- `TEAMWORK_PASSWORD`: Your Teamwork password

## Usage

### Starting the server

Development mode with auto-reload:
```
npm run dev
```

Production mode:
```
npm start
```

### Running as an MCP Server

To run as an MCP server for integration with Cursor and other applications:
```
npm run mcp
```

### Adding to Cursor

To add this MCP server to Cursor:

1. Open Cursor Settings > Features > MCP
2. Click "+ Add New MCP Server"
3. Enter a name for the server (e.g., "Teamwork API")
4. Select "stdio" as the transport type
5. Enter the command to run the server: `node path/to/teamwork-api-connector/src/mcp.js`
6. Click "Add"

The Teamwork API tools will now be available to the Cursor Agent in Composer.

### Available MCP Tools

The following tools are available through the MCP server:

- `getProjects` - Get all projects from Teamwork
- `getTasks` - Get all tasks from Teamwork
- `getTaskById` - Get a specific task by ID from Teamwork
- `createTask` - Create a new task in Teamwork
- `updateTask` - Update an existing task in Teamwork
- `deleteTask` - Delete a task from Teamwork

### API Endpoints

#### Projects
- `GET /api/teamwork/projects` - Get all projects

#### Tasks
- `GET /api/teamwork/tasks` - Get all tasks
- `GET /api/teamwork/tasks/:id` - Get a specific task
- `POST /api/teamwork/tasks` - Create a new task
- `PUT /api/teamwork/tasks/:id` - Update a task
- `DELETE /api/teamwork/tasks/:id` - Delete a task

## Testing

Run tests:
```
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.