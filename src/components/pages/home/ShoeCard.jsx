import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ShoeCard({
  id,
  brand,
  name,
  price,
  colors,
  description,
  image,
  tag,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/sneaker-grid/${brand}/${id}`)}
      className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex flex-col"
    >
      <div className="relative flex-grow">
        <div className="bg-gray-200 h-[20rem] flex items-center">
          <img
            loading="lazy"
            className="w-full h-auto px-4"
            src={image}
            alt="New Balance 550"
          />
        </div>
        {tag && (
          <div className="absolute top-0 right-0 pl-4 pr-3 py-2 bg-emerald-700 text-white font-bold rounded-bl-lg font-[Montserrat] tracking-wider">
            New
          </div>
        )}
      </div>
      <div className="p-4 font-[Poppins]">
        <h3 className="text-gray-900 text-xl font-semibold mb-2">
          {brand} {name}
        </h3>
        <p className="text-gray-700 text-lg">${price}</p>
        <p className="text-gray-700 mt-1">{colors}</p>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

ShoeCard.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tag: PropTypes.bool,
};
