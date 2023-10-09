import express, { Router } from 'express';
import serverless from 'serverless-http';
import axios from 'axios';

const router = Router();
router.get('/api/v1/sneakers', async (req, res) => {
  try {
    const apiUrl = 'https://app.retailed.io' + req.url;

    const axiosConfig = {
      headers: {
        ...req.headers,
        Host: 'app.retailed.io',
      },
    };

    const response = await axios.get(apiUrl, axiosConfig);

    console.log('API URL:', apiUrl);
    console.log('Response:', response.status, response.data);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      error: `Something went wrong: ${error.message}`,
    });
  }
});

const api = express();
api.use('/brands/', router);

export const handler = serverless(api);
