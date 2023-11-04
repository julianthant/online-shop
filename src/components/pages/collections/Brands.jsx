import BrandsList from '../../../data/BrandsList';
import { useNavigate } from 'react-router-dom';

export default function Brands() {
  const navigate = useNavigate();

  return (
    <div className="container pt-5">
      <h2 className="font-[Poppins] text-2xl text-slate-50 pb-5">Brands</h2>
      <div className="flex flex-wrap gap-5">
        {BrandsList.map((brand) => (
          <button
            key={brand.id}
            onClick={() => navigate(`/sneaker-grid/${brand.name}`)}
            className="rounded-md basis-[200px] flex-grow bg-gray-300 border-2 hover:bg-[#b1aeae] transition-colors duration-300 cursor-pointer"
          >
            <p className="px-5 py-4 text-black text-center font-semibold">
              {brand.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
