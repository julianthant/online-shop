import { createContext, useEffect, useState } from 'react';
import { auth } from '../../database/firebase';
import { useNewEmailAddress } from '../hooks/useEmailAddress';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  updateProfile,
  deleteUser,
} from 'firebase/auth';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [emailVerify, setEmailVerify] = useState(false);
  const [newEmailAddress, setNewEmailAddress] = useNewEmailAddress();
  const [loading, setLoading] = useState(true);

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

  console.log(currentUser);

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

  function verifyPasswordResetToken(token) {
    return verifyPasswordResetCode(auth, token);
  }

  function confirmPasswordResetToken(token, password) {
    return confirmPasswordReset(auth, token, password);
  }

  function newEmail(email) {
    return verifyBeforeUpdateEmail(currentUser, email);
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
      setLoading(false);
      if (user) {
        setEmailVerify(user.emailVerified);
        if (newEmailAddress && user.email === newEmailAddress) {
          setCurrentUser(user);
          setNewEmailAddress('');
        }
      } else {
        setEmailVerify(false);
      }
    });

    return () => unsubscribe();
  }, [newEmailAddress, setNewEmailAddress]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
    logout,
    resetPassword,
    changeProfile,
    deleteAccount,
    emailVerify,
    verifyPasswordResetToken,
    confirmPasswordResetToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
