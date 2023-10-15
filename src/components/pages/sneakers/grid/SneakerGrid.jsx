import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import PaginationInfo from './PaginationInfo';
import SneakerCard from './SneakerCard';
import SneakerFilter from './SneakerFilter';
import SneakerSort from './SneakerSort';
import ShowPageResults from './ShowPageResults';
import BestShoes from '../../../../data/BestShoes';
import NewShoes from '../../../../data/NewShoes';

export default function SneakerGrid() {
  const { brandName } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getShoeCollection } = useAuth();
  const sneakersPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);

  useEffect(() => {
    getShoeCollection(brandName, (data) => {
      const filteredBestShoes = BestShoes.filter(
        (shoe) => shoe.brand.toLowerCase() === brandName.toLowerCase()
      );
      const filteredNewShoes = NewShoes.filter(
        (shoe) => shoe.brand.toLowerCase() === brandName.toLowerCase()
      );

      const mergedSneakers = data.concat(filteredBestShoes, filteredNewShoes);

      setSneakers(mergedSneakers);
      setOriginalSneakers(mergedSneakers);
      setLoading(true);
    });
  }, [brandName, getShoeCollection]);

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
        <div className="flex lm:items-center pt-14 justify-between max-lm:flex-col max-lm:gap-3">
          <div className="flex gap-3 items-center">
            <div className="flex flex-grow">
              <SneakerFilter
                sneakers={sneakers}
                setFilteredSneakers={setFilteredSneakers}
                filteredSneakers={filteredSneakers}
                setOriginalSneakers={setOriginalSneakers}
              />
            </div>
            <ShowPageResults
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredSneakers.length}
            />
          </div>
          <SneakerSort
            filteredSneakers={filteredSneakers}
            setFilteredSneakers={setFilteredSneakers}
            originalSneakers={originalSneakers}
          />
        </div>
        <ul className="pt-10 sneaker-grid">
          {!loading ? (
            <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
              Loading Sneakers
              <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
                ....
              </span>
            </h1>
          ) : (
            sneakersToDisplay.map((sneaker) => (
              <li key={sneaker.id}>
                <SneakerCard
                  id={sneaker.id}
                  brand={brandName}
                  name={sneaker.name}
                  price={sneaker.price ? sneaker.price : sneaker.initialPrice}
                  image={sneaker.image}
                  colors={sneaker.colorway}
                />
              </li>
            ))
          )}
        </ul>
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
