import PropTypes from 'prop-types';
import { useState } from 'react';

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
      <td className="flex items-center h-52 gap-6 lm:pr-10">
        <div className="w-52 border-[20px] border-[#E5E5E5]">
          <img className="brightness-90" src={item.image} alt={item.name} />
        </div>
        <div className="flex flex-col product-container gap-4 text-left items-start">
          <p>{item.name}</p>
          <div className="lm:hidden max-xs:flex-col flex xs:justify-between xs:items-center w-full">
            <p>${item.price * quantity}.00 USD</p>
            <div className="flex items-center xs:justify-center max-xs:pt-3">
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
          </div>
          <p className="max-lm:hidden">{item.brand.toUpperCase()}</p>
          <button
            className="text-red-600 max-lm:hidden"
            onClick={() => onDelete(item.id)}
          >
            Remove
          </button>
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
      <td className="text-right w-28 max-lm:hidden">
        ${item.price * quantity}.00 USD
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    brand: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
