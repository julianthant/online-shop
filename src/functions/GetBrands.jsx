import axios from 'axios';

export default async function GetSneakers(setBrand) {
  const headers = {
    'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
  };

  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/sneakers/brands`,
      { headers: headers, maxBodyLength: Infinity }
    );
    setBrand(response.data.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}
