import SneakerCard from '../main/SneakerCard';
import GetSneakers from '../../functions/GetSneakers';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function SneakerGrid() {
  const { brandName, brandID } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCollection, addNewShoe } = useAuth();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    function getSneakers(sizing) {
      setSneakers((prevSneakers) => [
        ...prevSneakers,
        ...GetSneakers({ sizing: sizing, brand_id: brandID, extended: true }),
      ]);
    }

    async function fetchSneakers() {
      getSneakers('man');
      setIsLoading(false);
      getSneakers(brandName.toLowerCase());
      getSneakers('woman');
      getSneakers('toddler');
      getSneakers('primaryschool');
      getSneakers('gradeschool');
      setCompleted(true);
    }

    fetchSneakers();
  }, [brandID, brandName]);

  useEffect(() => {
    async function uploadSneakers() {
      const shoeCollectionRef = getCollection(brandName);

      for (const sneaker of sneakers) {
        await addNewShoe(shoeCollectionRef, sneaker);
      }
    }

    if (completed) {
      uploadSneakers();
    }
  }, [addNewShoe, brandName, completed, getCollection, sneakers]);

  return (
    <section className="pb-8 pt-24 bg-matte-black">
      <div className="container">
        <h2 className="text-slate-50 text-center pt-[5rem] text-5xl font-[Poppins]">
          {brandName} Collection
        </h2>
        <div className="pt-16 sneaker-grid">
          {isLoading && !sneakers ? (
            <p>Loading sneakers...</p>
          ) : (
            sneakers.map((sneaker) => (
              <SneakerCard
                key={sneaker.id}
                name={sneaker.name}
                price={sneaker.initialPrice}
                description={sneaker.description}
                image={sneaker.image}
                colors={sneaker.colorway}
                onAddToCart={() => {
                  console.log(`Added ${sneaker.name} to cart`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
