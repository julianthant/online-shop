import { useContext } from 'react';
import { QuantityContext } from '../contexts/QuantityContext';

export function useQuantity() {
  return useContext(QuantityContext);
}
