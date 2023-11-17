import { db } from '../../database/firebase';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { getItem } from './ObjectDisplay';

export async function addCart(
  shoeID,
  name,
  brand,
  price,
  image,
  quantity,
  size,
  color,
  currentUser
) {
  try {
    const userId = currentUser?.uid;
    const cartCollection = collection(db, 'users_cart');

    const querySnapshot = await getDocs(
      query(
        cartCollection,
        where('shoeID', '==', shoeID),
        where('userId', '==', userId)
      )
    );

    if (querySnapshot.docs.length > 0) {
      // If the item exists, update the quantity
      const existingItem = querySnapshot.docs[0];
      const existingItemId = existingItem.id;
      const existingItemData = existingItem.data();
      const updatedQuantity = existingItemData.quantity + quantity;

      // Update the item with the new quantity
      await updateDoc(doc(cartCollection, existingItemId), {
        quantity: updatedQuantity,
      });
    } else {
      // If the item doesn't exist, add a new item
      await addDoc(cartCollection, {
        shoeID,
        brand,
        name,
        price,
        image,
        quantity,
        size,
        color,
        userId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateCartItem(
  ID,
  newQuantity,
  updatedList,
  currentUser
) {
  try {
    const cartCollection = collection(db, 'users_cart');
    const cartItem = doc(cartCollection, ID);
    await updateDoc(cartItem, { quantity: newQuantity });
    getItem('users_cart', currentUser, updatedList);
  } catch (error) {
    console.error(error);
  }
}
