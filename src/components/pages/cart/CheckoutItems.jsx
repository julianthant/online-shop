import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CheckoutItems({
  cartItems,
  orderItems,
  error,
  success,
}) {
  const [addCosts, setAddCosts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setAddCosts(
      (cartItems.length > 0 ? 5 : 0) +
        cartItems.reduce((total, item) => total + item.quantity, 0) * 1
    );
    const newTotalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  return (
    <div>
      {cartItems.map((item, index) => (
        <ul
          key={item.id}
          className={`pt-8 grid gap-2 ${
            index !== cartItems.length - 1
              ? 'border-b-[1px] border-gray-400 pb-12 border-opacity-40'
              : 'pb-8'
          }`}
        >
          <li className="flex items-center justify-center pb-3">
            <Link
              to={`/sneaker-grid/${item.brand}/${item.id}`}
              className="text-base font-bold text-blue-700 underline s:text-right text-center"
            >
              {item.name}
            </Link>
          </li>
          <li className="flex items-center justify-between h-10 px-5">
            <h4 className="text-base font-bold">BRAND</h4>
            <h4 className="text-base font-bold">{item.brand}</h4>
          </li>
          <li className="flex items-center justify-between h-10 px-5 bg-[#242424]">
            <h4 className="text-base font-bold">SIZE</h4>
            <h4 className="text-base font-bold">US {item.size}</h4>
          </li>
          <li className="flex items-center justify-between h-10 px-5">
            <h4 className="text-base font-bold">COLOR</h4>
            <h4 className="text-base font-bold">{item.color}</h4>
          </li>
          <li className="flex items-center justify-between h-10 px-5 bg-[#242424]">
            <h4 className="text-base font-bold">PRICE</h4>
            <h4 className="text-base font-bold">${item.price}.00 USD</h4>
          </li>
          <li className="flex items-center justify-between h-10 px-5">
            <h4 className="text-base font-bold">QUANTITY</h4>
            <h4 className="text-base font-bold">
              {item.quantity} {item.quantity > 1 ? 'Items' : 'Item'}
            </h4>
          </li>
          <li className="flex items-center justify-between h-10 px-5 bg-[#242424]">
            <h4 className="text-base font-bold">TOTAL</h4>
            <h4 className="text-base font-bold">
              ${item.price * item.quantity}.00 USD
            </h4>
          </li>
        </ul>
      ))}
      <h3 className="text-lg font-bold border-b-[1px] border-gray-400">
        ADDITIONAL COSTS
      </h3>
      <div className="py-8 grid gap-8 border-b-[1px] border-gray-400">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">SHIPPING</h4>
          <h4 className="text-base font-bold">
            ${totalItems > 0 ? 5 : 0}.00 USD
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">DISCOUNT</h4>
          <h4 className="text-base font-bold">&mdash;</h4>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">TAX</h4>
          <h4 className="text-base font-bold">${totalItems * 1}.00 USD</h4>
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <h4 className="text-base font-bold">TOTAL COST</h4>
        <h4 className="text-base font-bold">${totalPrice + addCosts}.00 USD</h4>
      </div>
      {error && <p className="text-red-700 text-md mb-3">{error}</p>}
      {success && <p className="text-green-700 text-md mb-3">{success}</p>}
      <button
        onClick={() => orderItems(addCosts, totalPrice, totalItems)}
        className="text-center py-2 w-full mb-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-full"
      >
        Order Now
      </button>
      <Link
        to="/cart"
        className="text-base font-bold text-blue-600 hover:text-blue-500"
      >
        &larr; Back to Cart
      </Link>
    </div>
  );
}

CheckoutItems.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  orderItems: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};
