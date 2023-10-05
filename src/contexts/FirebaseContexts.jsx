import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../database/firebase';
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

  function getCollection(subcollection) {
    return collection(db, subcollection);
  }

  async function getShoeCollection(shoeCollectionRef, getShoeList) {
    try {
      const data = await getDocs(shoeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      getShoeList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewShoe(
    shoeCollectionRef,
    newBrand,
    newName,
    newColor,
    newDescription,
    newInstock,
    newSizes
  ) {
    try {
      const querySnapshot = await getDocs(
        query(shoeCollectionRef, where('name', '==', newName))
      );

      if (querySnapshot.size === 0) {
        await addDoc(shoeCollectionRef, {
          brand: newBrand,
          name: newName,
          color: newColor,
          description: newDescription,
          instock: newInstock,
          sizes: newSizes,
        });
        console.log(`Added shoe with the name "${newName}".`);
      } else {
        console.log(`A shoe with the name "${newName}" already exists.`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeShoe(id) {
    try {
      const movieDoc = doc(db, 'movies', id);
      deleteDoc(movieDoc);
    } catch (error) {
      console.error('Unable to delete item: ', error);
    }
  }

  async function updateShoe(id) {
    try {
      const movieDoc = doc(db, 'movies', id);
      updateDoc(movieDoc, {});
    } catch (error) {
      console.error(error);
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
    addNewShoe,
    removeShoe,
    updateShoe,
    getCollection,
    getShoeCollection,
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