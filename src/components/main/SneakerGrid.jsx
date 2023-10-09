import SneakerCard from '../main/SneakerCard';
import GetSneakers from '../../functions/GetSneakers';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SneakerGrid() {
  const { brandName, brandID } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paramsMan = {
      sizing: 'man',
      brand_id: brandID,
      extended: true,
    };

    const paramsWoman = {
      sizing: 'man',
      brand_id: brandID,
      extended: true,
    };

    async function fetchSneakers() {
      const menSneakers = await GetSneakers(paramsMan);
      setSneakers(menSneakers);
      setIsLoading(false);
      const womenSneakers = await GetSneakers(paramsWoman);
      setSneakers((prevSneakers) => [...prevSneakers, ...womenSneakers]);
    }

    fetchSneakers();
  }, [brandID]);

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
