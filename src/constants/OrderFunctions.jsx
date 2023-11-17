import { db } from '../../database/firebase';
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { showStatus } from './ShowStatus';

export async function addOrderInfo(
  cardID,
  billingID,
  cartItems,
  addCosts,
  totalPrice,
  totalItems,
  setError,
  setSuccess,
  currentUser
) {
  try {
    const userId = currentUser ? currentUser.uid : null;
    const cartCollection = collection(db, 'users_orders');

    await addDoc(cartCollection, {
      cardID: cardID,
      billingID: billingID,
      cartItems: cartItems,
      addCosts: addCosts,
      totalPrice: totalPrice,
      totalItems: totalItems,
      userId,
      createdAt: serverTimestamp(),
    });
    showStatus('Order has been created successfully', setSuccess);
  } catch (error) {
    showStatus('Error creating order', setError);
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrder(orderID, setOrder, setDate, setError) {
  try {
    const data = doc(db, 'users_orders', orderID);
    const item = await getDoc(data);

    if (item.exists()) {
      const orderItem = item.data();
      const createdAtTimestamp = orderItem.createdAt;

      // Convert the Firestore Timestamp to a JavaScript Date
      const createdAtDate = createdAtTimestamp.toDate();

      setDate(createdAtDate);
      setOrder(orderItem);
    } else {
      console.error(`Order with ID ${orderID} not found.`);
      showStatus(`Order with ID ${orderID} not found.`, setError);
    }
  } catch (error) {
    console.error(error);
  }
}
