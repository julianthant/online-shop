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
    <div className="pt-10">
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center pb-12">
          <h4 className="text-base font-bold">{item.name}</h4>
          <h4 className="text-base font-bold px-8">{item.quantity}</h4>
          <h4 className="text-base font-bold whitespace-nowrap">
            ${item.price * item.quantity}.00 USD
          </h4>
        </div>
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
