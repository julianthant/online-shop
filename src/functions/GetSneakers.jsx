import axios from 'axios';

export default async function GetSneakers(setSneakers, brand_id) {
  const headers = {
    'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
  };

  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_ORIGIN
      }/api/v1/sneakers?brand_id=${brand_id}&extended=true`,
      { headers: headers, maxBodyLength: Infinity }
    );
    setSneakers(response.data.data);
  } catch (error) {
    console.error('Error fetching sneakers:', error);
  }
}
