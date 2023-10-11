import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import PaginationInfo from './PaginationInfo';
import SneakerCard from './SneakerCard';
import SneakerFilter from './SneakerFilter';

export default function SneakerGrid() {
  const { brandName } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const { getCollection, getShoeCollection } = useAuth();
  const sneakersPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  useEffect(() => {
    const collection = getCollection(brandName);
    getShoeCollection(collection, setSneakers);
  }, [brandName, getCollection, getShoeCollection]);

  useEffect(() => {
    setFilteredSneakers(sneakers);
  }, [sneakers]);

  const startIndex = (currentPage - 1) * sneakersPerPage;
  const endIndex = startIndex + sneakersPerPage;
  const sneakersToDisplay = filteredSneakers.slice(startIndex, endIndex);

  return (
    <section className="pb-8 pt-24 bg-matte-black">
      <div className="container">
        <h2 className="text-slate-50 text-center pt-[5rem] text-5xl font-[Poppins]">
          {brandName} Collection
        </h2>
        <SneakerFilter
          sneakers={sneakers}
          setFilteredSneakers={setFilteredSneakers}
          filteredSneakers={filteredSneakers}
        />
        <div className="pt-16 sneaker-grid">
          {!sneakers ? (
            <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
              Loading Seaker Details
              <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
                ....
              </span>
            </h1>
          ) : (
            sneakersToDisplay.map((sneaker) => (
              <Link
                to={`/sneaker-grid/${brandName}/${sneaker.id}`}
                key={sneaker.id}
              >
                <SneakerCard
                  id={sneaker.id}
                  name={sneaker.name}
                  price={sneaker.initialPrice}
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
        <PaginationInfo
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredSneakers.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
