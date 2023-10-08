// netlify/functions/getSneakers.js
const axios = require('axios');
const https = require('https');

export async function handler(event, context) {
  try {
    const apiUrl = 'https://app.retailed.io' + event.path;

    const axiosConfig = {
      headers: {
        ...event.headers,
        Host: 'app.retailed.io',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    const response = await axios.get(apiUrl, axiosConfig);

    // Log the request and response for debugging
    console.log('API URL:', apiUrl);
    console.log('Response:', response.status, response.data);

    // Return a response
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error:', error);

    // Set the HTTP status code based on the error response or default to 500
    const statusCode = error.response?.status || 500;
    return {
      statusCode,
      body: JSON.stringify({ error: `Something went wrong: ${error.message}` }),
    };
  }
}
