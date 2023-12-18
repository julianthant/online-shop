import { db, setCache, getCache } from '../../database/firebase';
import { getDocs, getDoc, collection, doc } from 'firebase/firestore';

export async function getShoeCollection(brandName, setShoeList) {
  try {
    const cachedData = getCache(brandName);
    if (cachedData) {
      setShoeList(cachedData);
    } else {
      const shoeCollectionRef = collection(db, brandName);
      const data = await getDocs(shoeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setShoeList(filteredData);
      setCache(brandName, filteredData);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getShoe(brandName, sneakerID, setSneaker, setError) {
  try {
    const cacheKey = `sneakerCache-${brandName}-${sneakerID}`;
    const cachedData = getCache(cacheKey);

    // Check if 'sizes' key exists in cached data and it's not an empty array
    if (cachedData && 'sizes' in cachedData && cachedData.sizes.length > 0) {
      setSneaker(cachedData);
    } else {
      // 'sizes' key doesn't exist or it's an empty array, so we need to fetch and update the data
      const data = doc(db, brandName, sneakerID);
      const item = await getDoc(data);

      if (item.exists()) {
        const sneakerData = item.data();

        // Update the cached data with the fetched data
        setCache(cacheKey, sneakerData);
        setSneaker(sneakerData);
      } else {
        console.error(`Sneaker with ID ${sneakerID} not found.`);
        setError(true);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
