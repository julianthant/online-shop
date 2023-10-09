import BrandsList from '../../../data/BrandsList';
import { useNavigate } from 'react-router-dom';

export default function Brands() {
  const navigate = useNavigate();

  return (
    <div className="container pt-5">
      <h2 className="font-[Poppins] text-2xl text-slate-50 pb-5">Brands</h2>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-5">
        {BrandsList.map((brand) => (
          <button
            key={brand.id}
            onClick={() => navigate(`/sneaker-grid/${brand.name}/${brand.id}`)}
            className="rounded-md bg-[#1B1B1B] border border-light-gray hover:bg-[#2B2B2B] transition-colors duration-300 cursor-pointer"
          >
            <p className="px-5 py-4 text-white text-center font-semibold">
              {brand.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
