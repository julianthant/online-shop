import axios from 'axios';

export const handler = async (event) => {
  try {
    const baseUrl = 'https://app.retailed.io/api/v1/sneakers';

    const queryParams = {
      brand_id: event.queryStringParameters.brand_id,
      extended: true,
    };

    const response = await axios.get(baseUrl, {
      headers: {
        Accept: 'application/json',
        Host: 'app.retailed.io',
        'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
      },
      params: queryParams,
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return { statusCode: 422, body: error.stack };
  }
};
