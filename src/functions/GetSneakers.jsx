import axios from 'axios';

export default async function GetSneakers(setSneakers, brand_id) {
  const headers = {
    'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
  };

  try {
    const response = await axios.get(
      `/.netlify/functions/getSneakers?brand_id=${brand_id}&extended=true`,
      { headers: headers, maxBodyLength: Infinity }
    );
    console.log(response.data.data);
    setSneakers(response.data.data);
  } catch (error) {
    console.error('Error fetching sneakers:', error);
  }
}
