import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase';

import PropTypes from 'prop-types';

export const QuantityContext = createContext();

export function QuantityProvider({ children }) {
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function getNumberOfItems() {
      const currentUserId = currentUser ? currentUser.uid : null;
      try {
        const userQuery = query(
          collection(db, 'users_cart'),
          where('userId', '==', currentUserId)
        );
        const querySnapshot = await getDocs(userQuery);
        const numberOfItems = querySnapshot.size;
        setQuantity(numberOfItems || 0);
      } catch (error) {
        console.error('Error getting number of items:', error);
      }
    }

    if (currentUser) {
      getNumberOfItems();
    }
  }, [currentUser]);

  const value = { quantity, setQuantity };

  return (
    <QuantityContext.Provider value={value}>
      {children}
    </QuantityContext.Provider>
  );
}

QuantityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
