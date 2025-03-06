require('dotenv').config();
const { startMcpServer } = require('./mcp-server');

// Start the MCP server
startMcpServer().catch(error => {
  console.error(`Error starting MCP server: ${error.message}`);
  process.exit(1);
}); 