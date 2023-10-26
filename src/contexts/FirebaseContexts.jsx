import { createContext, useEffect, useState } from 'react';
import { auth, db, setCache, getCache } from '../../database/firebase';
import { showStatus } from '../constants/ShowStatus';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  updateProfile,
  deleteUser,
  applyActionCode,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import {
  getDocs,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

export const AuthContext = createContext();

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function getNumberOfItems() {
      const currentUserId = currentUser ? currentUser.uid : null;
      try {
        const userQuery = query(
          getCollection('users_cart'),
          where('userId', '==', currentUserId)
        );
        const querySnapshot = await getDocs(userQuery);
        const numberOfItems = querySnapshot.size;
        setQuantity(numberOfItems);
      } catch (error) {
        console.error('Error getting number of items:', error);
      }
    }

    getNumberOfItems();
  }, [currentUser]);

  function getCollection(subcollection) {
    return collection(db, subcollection);
  }

  async function getShoeCollection(brandName, setShoeList) {
    try {
      const cachedData = getCache(brandName);
      if (cachedData) {
        setShoeList(cachedData);
      } else {
        const shoeCollectionRef = getCollection(brandName);
        const data = await getDocs(shoeCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setShoeList(filteredData);
        setCache(brandName, filteredData);
        console.log('scol');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getShoe(brandName, sneakerID, setSneaker, setError) {
    try {
      const cachedData = getCache(`sneakerCache-${brandName}-${sneakerID}`);
      if (cachedData) {
        setSneaker(cachedData);
      } else {
        const data = await doc(db, brandName, sneakerID);
        const item = await getDoc(data);

        if (item.exists()) {
          const sneakerData = item.data();
          setSneaker(sneakerData);

          setCache(`sneakerCache-${brandName}-${sneakerID}`, sneakerData);
        } else {
          console.error(`Sneaker with ID ${sneakerID} not found.`);
          setError(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getItem(setItems, db) {
    try {
      const currentUserId = currentUser ? currentUser.uid : null;
      const collection = getCollection(db);
      const userQuery = query(collection, where('userId', '==', currentUserId));
      const data = await getDocs(userQuery);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  async function addCart(shoeID, name, brand, price, image, colors, quantity) {
    try {
      const userId = auth?.currentUser?.uid;
      const cartCollection = getCollection('users_cart');

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
          colors,
          quantity,
          userId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(ID, newQuantity, updatedList) {
    try {
      const collection = getCollection('users_cart');
      const cartItem = doc(collection, ID);
      await updateDoc(cartItem, { quantity: newQuantity });
      getItem(updatedList, 'users_cart');
    } catch (error) {
      console.error(error);
    }
  }

  async function addCardInfo(
    cardNumber,
    cardName,
    expiryDate,
    cvv,
    updatedList,
    setError,
    setSuccess
  ) {
    try {
      const userId = currentUser ? currentUser.uid : null;
      const cartCollection = getCollection('users_cards');

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

      getItem(updatedList, 'users_cards');
    } catch (error) {
      showStatus('Error adding card', setError);
      console.error('Error adding card:', error);
      throw error;
    }
  }

  async function updateCardInfo(
    cardId,
    cardNumber,
    cardName,
    expiryDate,
    cvv,
    updatedList,
    setError,
    setSuccess
  ) {
    try {
      const cartCollection = getCollection('users_cards');
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

      getItem(updatedList, 'users_cards');
    } catch (error) {
      showStatus('Error updating card', setError);
      console.error('Error updating card:', error);
      throw error;
    }
  }

  async function addBillingInfo(
    address,
    country,
    city,
    state,
    postalCode,
    updatedList,
    setError,
    setSuccess
  ) {
    try {
      const userId = currentUser ? currentUser.uid : null;
      const billingCollection = getCollection('users_billing');

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
      getItem(updatedList, 'users_billing');
    } catch (error) {
      showStatus('Error adding billing info', setError);
      console.error('Error adding billing info:', error);
      throw error;
    }
  }

  async function updateBillingInfo(
    billingId,
    address,
    country,
    city,
    state,
    postalCode,
    updatedList,
    setError,
    setSuccess
  ) {
    try {
      const billingCollection = getCollection('users_billing');
      const billingRef = doc(billingCollection, billingId);
      const billingDoc = await getDoc(billingRef);

      if (billingDoc.exists()) {
        await updateDoc(billingRef, {
          aaddress: address,
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

      getItem(updatedList, 'users_billing');
    } catch (error) {
      showStatus('Error updating billing info', setError);
      console.error('Error updating billing info:', error);
      throw error;
    }
  }

  async function removeItem(ID, updatedList, db) {
    try {
      const collection = getCollection(db);
      const cartItem = doc(collection, ID);
      await deleteDoc(cartItem);
      getItem(updatedList, db);
    } catch (error) {
      console.error('Unable to delete item: ', error);
    }
  }

  function signup(email, password, displayName) {
    try {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return updateProfile(userCredential.user, {
            displayName: displayName,
          }).then(() => {
            return sendEmailVerification(userCredential.user);
          });
        })
        .then(() => {
          return true;
        });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function verifyEmail() {
    return sendEmailVerification(currentUser);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    signOut(auth);
  }

  async function resetPassword(email) {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  function confirmPasswordResetToken(token, password) {
    return confirmPasswordReset(auth, token, password);
  }

  function newEmail(email) {
    return verifyBeforeUpdateEmail(currentUser, email);
  }

  function applyCode(code) {
    return applyActionCode(auth, code);
  }

  function newPassword(password) {
    return updatePassword(currentUser, password);
  }

  function changeProfile(displayName) {
    return updateProfile(currentUser, { displayName });
  }

  function deleteAccount() {
    return deleteUser(currentUser);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    newEmail,
    newPassword,
    currentUser,
    login,
    signup,
    verifyEmail,
    applyCode,
    logout,
    resetPassword,
    changeProfile,
    deleteAccount,
    confirmPasswordResetToken,
    setCurrentUser,
    getCollection,
    getShoeCollection,
    getShoe,
    getItem,
    addCart,
    updateCartItem,
    addCardInfo,
    updateCardInfo,
    addBillingInfo,
    updateBillingInfo,
    removeItem,
    quantity,
    setQuantity,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
