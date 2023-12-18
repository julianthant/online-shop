import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onQuantityChange, onDelete }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item, newQuantity);
    }
  };

  return (
    <tr className="border-b-[1px] border-gray-400 text-center font-[Poppins]">
      <td className="flex items-center ms:h-52 gap-6 max-ms:py-8 pl-4 max-ms:block">
        <Link
          to={`/sneaker-grid/${item.brand}/${item.shoeID}`}
          className="w-52 ms:border-[20px] ms:border-[#E5E5E5]"
        >
          <img
            className="brightness-90 bg-white max-ms:rounded-lg max-ms:p-6"
            loading="eager"
            src={item.image}
            alt={item.name}
          />
        </Link>
        <div className="flex flex-col ms:product-container gap-4 text-left items-start pt-8">
          <p className="ms:w-60">{item.name}</p>
          <div className="lm:hidden flex ms:justify-between ms:items-center gap-20">
            <div className="flex items-center">
              <button
                className="p-1 text-2xl w-9 flex items-center justify-center pb-[0.4rem]"
                onClick={handleDecrement}
              >
                -
              </button>
              <p className="flex items-center justify-center p-1 w-11 h-8 border rounded-none border-gray-300 border-opacity-70">
                {quantity}
              </p>
              <button
                className="p-1 text-2xl w-9 flex items-center justify-center pb-[0.4rem]"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button className="text-red-600 " onClick={() => onDelete(item.id)}>
              Remove
            </button>
          </div>
          <p className="max-lm:hidden">{item.brand.toUpperCase()}</p>
          <p>${item.price * quantity}.00 USD</p>
        </div>
      </td>
      <td className="text-right w-28 max-lm:hidden">${item.price}.00 USD</td>
      <td className="w-36 max-lm:hidden">
        <div className="flex items-center justify-center">
          <button
            className="p-1 text-2xl w-9 flex items-center justify-center pb-[0.4rem]"
            onClick={handleDecrement}
          >
            -
          </button>
          <p className="flex items-center justify-center p-1 w-11 h-8 border rounded-none border-gray-300 border-opacity-70">
            {quantity}
          </p>
          <button
            className="p-1 text-2xl w-9 flex items-center justify-center pb-[0.4rem]"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-right w-28 max-lm:hidden pr-4">
        ${item.price * quantity}.00 USD
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shoeID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    brand: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
