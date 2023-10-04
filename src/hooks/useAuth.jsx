import { useContext } from 'react';
import { AuthContext } from '../contexts/FirebaseContexts';

export function useAuth() {
  return useContext(AuthContext);
}
