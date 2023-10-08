import PropTypes from 'prop-types';

export default function ShoeCard({
  name,
  price,
  description,
  image,
  colors,
  onAddToCart,
}) {
  const cleanedName = name.replace(/\([^()]*\)/g, '');

  if (price === null) {
    price = Math.floor(Math.random() * 21) * 10 + 100;
  }

  return (
    <div className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      <div className="bg-white h-[18rem] flex items-center justify-center">
        <img src={image} alt={`${cleanedName}`} className="w-80 h-auto px-4" />
      </div>
      <div className="p-4 font-[Poppins] grid sm:h-[16rem] h-[14rem]">
        <h2 className="text-gray-900 text-xl font-semibold mb-2">
          {cleanedName}
        </h2>
        <p className="text-gray-700 text-lg">Price: ${price}</p>
        {description ? (
          <p className="text-gray-700 text-lg mb-2">{description}</p>
        ) : null}
        {colors && colors.length > 0 && (
          <div className="flex">
            <p className="text-gray-700 text-lg">{colors}</p>
          </div>
        )}
        <div className="mt-auto">
          <button
            className="mt-2 px-4 py-2 w-full bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

ShoeCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  colors: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
};
