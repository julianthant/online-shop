import fetch from 'node-fetch';

const handler = async (event, context) => {
  const url = 'https://app.retailed.io/api/v1/sneakers/brands';
  try {
    const brands = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Host: 'app.retailed.io',
        'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
      },
    });
    const brandList = await brands.json();
    return {
      statusCode: 200,
      body: JSON.stringify(brandList),
    };
  } catch (error) {
    return { statusCode: 422, body: error.stack };
  }
};

export default handler;
