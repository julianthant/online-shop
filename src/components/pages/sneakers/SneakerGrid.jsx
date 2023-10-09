import SneakerCard from './SneakerCard';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export default function SneakerGrid() {
  const { brandName } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCollection, getShoeCollection } = useAuth();

  useEffect(() => {
    const collection = getCollection(brandName);
    getShoeCollection(collection, setSneakers);
    setIsLoading(false);
  }, [brandName, getCollection, getShoeCollection]);

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
              <Link
                to={`/sneaker-grid/${brandName}/${sneaker.id}`}
                key={sneaker.id}
              >
                <SneakerCard
                  name={sneaker.name}
                  price={sneaker.initialPrice}
                  description={sneaker.description}
                  image={sneaker.image}
                  colors={sneaker.colorway}
                  onAddToCart={() => {
                    console.log(`Added ${sneaker.name} to cart`);
                  }}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
