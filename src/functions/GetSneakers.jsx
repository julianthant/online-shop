import axios from 'axios';

export default async function GetSneakers(queryParams) {
  try {
    const response = await axios.get(`/.netlify/functions/getSneakers`, {
      params: queryParams,
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
  }
}
