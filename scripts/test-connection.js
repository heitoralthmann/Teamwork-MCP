import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const domain = process.env.TEAMWORK_DOMAIN;
const username = process.env.TEAMWORK_USERNAME;
const password = process.env.TEAMWORK_PASSWORD;

if (!domain || !username || !password) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const url = `https://${domain}.teamwork.com/projects/api/v3/projects.json`;
console.log(`Testing connection to ${url}`);

const auth = Buffer.from(`${username}:${password}`).toString('base64');

axios.get(url, {
  headers: {
    Authorization: `Basic ${auth}`
  }
})
.then(res => {
  console.log('Connection successful!');
  console.log(`Status: ${res.status}`);
  console.log(`Data: ${JSON.stringify(res.data).substring(0, 200)}...`);
})
.catch(err => {
  console.error('Connection failed!');
  console.error(`Error: ${err.message}`);

  if (err.response) {
    console.error(`Status: ${err.response.status}`);
    console.error(`Data: ${JSON.stringify(err.response.data)}`);
  }

  process.exit(1);
});
