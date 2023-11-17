import { db } from '../../database/firebase';
import {
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  collection,
} from 'firebase/firestore';
import { showStatus } from './ShowStatus';
import { getItem } from './ObjectDisplay';

export async function addCardInfo(
  cardNumber,
  cardName,
  expiryDate,
  cvv,
  updatedList,
  setError,
  setSuccess,
  currentUser
) {
  try {
    const userId = currentUser ? currentUser.uid : null;
    const cartCollection = collection(db, 'users_cards');

    const querySnapshot = await getDocs(
      query(
        cartCollection,
        where('cardNumber', '==', cardNumber),
        where('userId', '==', userId)
      )
    );

    if (querySnapshot.docs.length > 0) {
      showStatus('Card already exists', setError);
    } else {
      await addDoc(cartCollection, {
        cardNumber: cardNumber,
        cardName: cardName,
        expiryDate: expiryDate,
        cvv: cvv,
        userId,
      });
      showStatus('Card has been added successfully', setSuccess);
    }

    getItem('users_cards', currentUser, updatedList);
  } catch (error) {
    showStatus('Error adding card', setError);
    console.error('Error adding card:', error);
    throw error;
  }
}

export async function updateCardInfo(
  cardId,
  cardNumber,
  cardName,
  expiryDate,
  cvv,
  updatedList,
  setError,
  setSuccess,
  currentUser
) {
  try {
    const cartCollection = collection(db, 'users_cards');
    const cardRef = doc(cartCollection, cardId);
    const cardDoc = await getDoc(cardRef);

    if (cardDoc.exists()) {
      await updateDoc(cardRef, {
        cardNumber: cardNumber,
        cardName: cardName,
        expiryDate: expiryDate,
        cvv: cvv,
      });

      showStatus('Card has been updated successfully', setSuccess);
    } else {
      showStatus('Card not found', setError);
      throw new Error('Card not found');
    }

    getItem('users_cards', currentUser, updatedList);
  } catch (error) {
    showStatus('Error updating card', setError);
    console.error('Error updating card:', error);
    throw error;
  }
}

export async function addBillingInfo(
  address,
  country,
  city,
  state,
  postalCode,
  updatedList,
  setError,
  setSuccess,
  currentUser
) {
  try {
    const userId = currentUser ? currentUser.uid : null;
    const billingCollection = collection(db, 'users_billing');

    await addDoc(billingCollection, {
      address: address,
      country: country,
      city: city,
      state: state,
      postalCode: postalCode,
      userId,
    });
    showStatus(
      'Your billing information has been updated successfully',
      setSuccess
    );
    getItem('users_billing', currentUser, updatedList);
  } catch (error) {
    showStatus('Error adding billing info', setError);
    console.error('Error adding billing info:', error);
    throw error;
  }
}

export async function updateBillingInfo(
  billingId,
  address,
  country,
  city,
  state,
  postalCode,
  updatedList,
  setError,
  setSuccess,
  currentUser
) {
  try {
    const billingCollection = collection(db, 'users_billing');
    const billingRef = doc(billingCollection, billingId);
    const billingDoc = await getDoc(billingRef);

    if (billingDoc.exists()) {
      await updateDoc(billingRef, {
        address: address,
        country: country,
        city: city,
        state: state,
        postalCode: postalCode,
      });

      showStatus(
        'Your billing information has been updated successfully',
        setSuccess
      );
    } else {
      showStatus('Billing information not found', setError);
      throw new Error('Billing information not found');
    }

    getItem('users_billing', currentUser, updatedList);
  } catch (error) {
    showStatus('Error updating billing info', setError);
    console.error('Error updating billing info:', error);
    throw error;
  }
}
