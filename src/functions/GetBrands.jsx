import axios from 'axios';

export default async function GetSneakers(setBrand) {
  try {
    const response = await axios.get('/.netlify/functions/brands');
    console.log(response.data.data);
    setBrand(response.data.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}
