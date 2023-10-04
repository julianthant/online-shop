import { useAuth } from '../hooks/useAuth';
import shoes from '../data/shoe.json';
import { useEffect } from 'react';

export default function AddShoeToDB() {
  const { getCollection, addNewShoe } = useAuth();

  useEffect(() => {
    shoes.forEach((item) => {
      const collection = getCollection(item.brand.toLowerCase());
      addNewShoe(
        collection,
        item.brand,
        item.name,
        item.color,
        item.description,
        item.instock,
        item.sizes
      );
    });
  }, [addNewShoe, getCollection]);
}
