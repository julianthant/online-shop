import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

import PaginationInfo from './PaginationInfo';
import SneakerCard from './SneakerCard';
import SneakerFilter from './SneakerFilter';
import SneakerSort from './SneakerSort';
import ShowPageResults from './ShowPageResults';
import BrandsList from '../../../../data/BrandsList';
import NewShoes from '../../../../data/NewShoes';
import BestShoes from '../../../../data/BestShoes';

export default function SneakerGrid() {
  const [sneakers, setSneakers] = useState([]);
  const { newGetItem } = useAuth();
  const sneakersPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gender = queryParams.get('gender');

  useEffect(() => {
    window.scrollTo(top);
  }, []);

  useEffect(() => {
    let cachedSneakers = localStorage.getItem('cachedSneakers');
    if (cachedSneakers) {
      cachedSneakers = JSON.parse(cachedSneakers);
      setSneakers(cachedSneakers);
      setOriginalSneakers(cachedSneakers);
      setFilteredSneakers(cachedSneakers);
    } else {
      const brandPromises = BrandsList.map((brand) => newGetItem(brand.name));
      Promise.all(brandPromises)
        .then((brandData) => {
          const mergedSneakers = brandData.concat(BestShoes, NewShoes);
          const combinedToOne = mergedSneakers.flat();

          setSneakers(combinedToOne);
          setOriginalSneakers(combinedToOne);
          setFilteredSneakers(combinedToOne);

          // Cache the data in localStorage for future use
          localStorage.setItem('cachedSneakers', JSON.stringify(combinedToOne));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startIndex = (currentPage - 1) * sneakersPerPage;
  const endIndex = startIndex + sneakersPerPage;
  const sneakersToDisplay = filteredSneakers.slice(startIndex, endIndex);

  return (
    <section className="pb-8 bg-matte-black">
      <div className="container">
        {sneakers && (
          <div className="flex lm:items-center pt-14 justify-between max-lm:flex-col max-lm:gap-3">
            <div className="flex gap-3 items-center">
              <div className="flex flex-grow">
                <SneakerFilter
                  sneakers={sneakers}
                  setFilteredSneakers={setFilteredSneakers}
                  setOriginalSneakers={setOriginalSneakers}
                  gender={gender}
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
        )}
        <ul className="pt-10 sneaker-grid">
          {!sneakers ? (
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
                  brand={sneaker.brandName}
                  name={sneaker.name}
                  image={sneaker.image}
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
