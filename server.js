import express from 'express';
import cors from 'cors';
import axios from 'axios';
import https from 'https';

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://solesteals.netlify.app'],
    methods: 'GET',
    credentials: true,
  })
);

app.get('/api/v1/sneakers', async (req, res) => {
  try {
    const apiUrl = 'https://app.retailed.io' + req.url;

    const axiosConfig = {
      headers: {
        ...req.headers,
        Host: 'app.retailed.io',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    const response = await axios.get(apiUrl, axiosConfig);

    // Log the request and response for debugging
    console.log('API URL:', apiUrl);
    console.log('Response:', response.status, response.data);

    // Set the HTTP status code and return only the data
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error:', error);

    // Set the HTTP status code based on the error response or default to 500
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      error: `Something went wrong: ${error.message}`,
    });
  }
});

app.get('/api/v1/sneakers/brands', async (req, res) => {
  try {
    const apiUrl = 'https://app.retailed.io' + req.url;

    const axiosConfig = {
      headers: {
        ...req.headers,
        Host: 'app.retailed.io',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    const response = await axios.get(apiUrl, axiosConfig);

    // Log the request and response for debugging
    console.log('API URL:', apiUrl);
    console.log('Response:', response.status, response.data);

    // Set the HTTP status code and return only the data
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error:', error);

    // Set the HTTP status code based on the error response or default to 500
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      error: `Something went wrong: ${error.message}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
