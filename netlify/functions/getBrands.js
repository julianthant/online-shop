const axios = require('axios');
const https = require('https');

export async function handler(event, context) {
  const apiUrl = 'https://app.retailed.io/api/v1/sneakers/brands';

  const axiosConfig = {
    headers: {
      ...event.headers,
      Host: 'app.retailed.io',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };

  try {
    const response = await axios.get(apiUrl, axiosConfig);

    // Return a response
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // Handle errors and send an error response
    const statusCode = error.response?.status || 500;
    return {
      statusCode,
      body: JSON.stringify({ error: `Something went wrong: ${error.message}` }),
    };
  }
}
