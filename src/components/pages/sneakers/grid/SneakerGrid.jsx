import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import PaginationInfo from './PaginationInfo';
import SneakerCard from './SneakerCard';
import SneakerFilter from './SneakerFilter';
import SneakerSort from './SneakerSort';
import ShowPageResults from './ShowPageResults';
import BrandsList from '../../../../data/BrandsList';
import BestShoes from '../../../../data/BestShoes';
import NewShoes from '../../../../data/NewShoes';

export default function SneakerGrid() {
  const [sneakers, setSneakers] = useState([]);
  const { newGetItem } = useAuth();
  const sneakersPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);

  useEffect(() => {
    const brandPromises = BrandsList.map((brand) => newGetItem(brand.name));
    Promise.all(brandPromises)
      .then((brandData) => {
        const mergedSneakers = brandData.concat(BestShoes, NewShoes);
        const combinedToOne = mergedSneakers.flat();

        setSneakers(combinedToOne);
        setOriginalSneakers(combinedToOne);
        setFilteredSneakers(sneakers);
      })
      .catch((error) => {
        console.error(error);
      });
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
        )}
        <ul className="pt-10 sneaker-grid">
          {sneakers.length === 0 ? (
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
