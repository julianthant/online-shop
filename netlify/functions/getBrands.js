import axios from 'axios';

const handler = async () => {
  const url = 'https://app.retailed.io/api/v1/sneakers/brands';
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Host: 'app.retailed.io',
        'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
      },
    });

    const brandList = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(brandList),
    };
  } catch (error) {
    return { statusCode: 422, body: error.stack };
  }
};

export { handler };
