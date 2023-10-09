import axios from 'axios';

export default async function GetSneakers(setBrand) {
  try {
    const response = await axios.get('/.netlify/functions/brands');
    const data = await response.json();
    console.log(data.data.data);
    setBrand(data.data.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}
