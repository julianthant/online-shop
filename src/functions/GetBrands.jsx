import axios from 'axios';

export default async function GetSneakers(setBrand) {
  const headers = {
    'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
  };

  try {
    const response = await axios.get(
      '/.netlify/functions/getBrands', // Update with your actual function name, e.g., 'getBrands'
      { headers: headers, maxBodyLength: Infinity }
    );
    console.log(response.data.data);
    setBrand(response.data.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}
