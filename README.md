# Teamwork API Connector

An MCP server that connects to the Teamwork API, providing a simplified interface for interacting with Teamwork projects and tasks.

## Features

- Connect to Teamwork API
- Retrieve projects and tasks
- Create, update, and delete tasks
- RESTful API endpoints
- Error handling and logging

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

4. Update the `.env` file with your Teamwork API credentials.

## Configuration

Edit the `.env` file to configure the application:

- `PORT`: The port on which the server will run (default: 3000)
- `NODE_ENV`: The environment (development, production, test)
- `LOG_LEVEL`: Logging level (info, error, debug)
- `TEAMWORK_API_URL`: Your Teamwork domain API URL
- `TEAMWORK_API_KEY`: Your Teamwork API key

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