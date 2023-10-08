import SneakerCard from '../main/SneakerCard';
import GetSneakers from '../../functions/GetSneakers';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SneakerGrid() {
  const { name, brandID } = useParams();
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    GetSneakers(setSneakers, brandID);
  }, [brandID]);

  return (
    <section className="pb-8 pt-24 bg-matte-black">
      <div className="container">
        <h2 className="text-slate-50 text-center pt-[5rem] text-5xl font-[Poppins]">
          {name} Collection
        </h2>
        <div className="pt-16 sneaker-grid">
          {sneakers &&
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
            ))}
        </div>
      </div>
    </section>
  );
}

SneakerGrid.propTypes = {
  Data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
      colors: PropTypes.string,
      onAddToCart: PropTypes.func,
    })
  ).isRequired,
  ID: PropTypes.string.isRequired,
};
