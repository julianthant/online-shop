import { db, setCache, getCache } from '../../database/firebase';
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export async function getItem(subcollection, currentUser, setData) {
  try {
    const currentUserId = currentUser ? currentUser.uid : null;
    const itemCollection = collection(db, subcollection);
    const userQuery = query(
      itemCollection,
      where('userId', '==', currentUserId)
    );
    const data = await getDocs(userQuery);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(filteredData);
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function newGetItem(brandName) {
  try {
    const cachedData = getCache(brandName);
    // Check if 'sizes' key exists in cached data and it's not an empty array
    if (cachedData && 'sizes' in cachedData && cachedData.sizes.length > 0) {
      return cachedData;
    } else {
      const itemCollectionRef = collection(db, brandName);
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCache(brandName, filteredData);
      return filteredData;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeItem(ID, updatedList, path) {
  try {
    const cartItem = doc(db, path, ID);
    await deleteDoc(cartItem);
    getItem(updatedList, path);
  } catch (error) {
    console.error('Unable to delete item: ', error);
  }
}
