import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
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
  const { currentUser, addCart, setQuantity, quantity } = useAuth();
  const navigate = useNavigate();

  function addToCart(e) {
    e.stopPropagation();
    if (currentUser) {
      addCart(id, name, brand, price, image, colors, 1);
      setQuantity(quantity + 1);
    } else {
      navigate(
        '/login?Message=Please%20login%20to%20add%20items%20into%20cart'
      );
    }
  }

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
      <div className="w-[90%] mx-auto mt-auto">
        <button
          className="px-4 py-2 mb-2 w-full bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition"
          onClick={addToCart}
        >
          Add to Cart
        </button>
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
