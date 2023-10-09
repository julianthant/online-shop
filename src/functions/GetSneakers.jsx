import axios from 'axios';

export default async function GetSneakers(setSneakers, queryParams) {
  try {
    const response = await axios.get(`/.netlify/functions/getSneakers`, {
      params: queryParams,
    });

    setSneakers(response.data.data);
  } catch (error) {
    console.error('Error fetching sneakers:', error);
  }
}
