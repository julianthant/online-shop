import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { showStatus } from '../../../utilities/ShowStatus';
import { getItem } from '../../../utilities/ObjectDisplay';
import { useQuantity } from '../../../hooks/useQuantity';
import { removeItem } from '../../../utilities/ObjectDisplay';
import { updateCartItem } from '../../../utilities/CartFunctions';

import ToLogin from './ToLogin';
import CartItem from './CartItem';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cards, setCards] = useState([]);
  const [billing, setBilling] = useState([]);
  const [error, setError] = useState(false);

  const [addCosts, setAddCosts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const { quantity, setQuantity } = useQuantity();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      getItem('users_cart', currentUser, setCartItems);
      getItem('users_cards', currentUser, setCards);
      getItem('users_billing', currentUser, setBilling);
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

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

  const handleDelete = (ID) => {
    removeItem(ID, setCartItems, 'users_cart', currentUser);
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleQuantityChange = (item, newQuantity) => {
    updateCartItem(item.id, newQuantity, setCartItems, currentUser);
  };

  function handleCheckout() {
    if (cards.length === 0) {
      showStatus(
        <span>
          Please add{' '}
          <Link
            className="text-red-500 underline underline-offset-1"
            to="/dashboard?mode=Payment"
          >
            card
          </Link>{' '}
          information to purchase.
        </span>,
        setError
      );
    } else if (billing.length === 0) {
      showStatus(
        <span>
          Please add{' '}
          <Link
            className="text-red-500 underline underline-offset-1"
            to="/dashboard?mode=Payment"
          >
            billing
          </Link>{' '}
          information to purchase.
        </span>,
        setError
      );
    } else if (cartItems.length === 0) {
      showStatus('Please add items into the cart.', setError);
    } else {
      navigate('/checkout');
    }
  }

  return (
    <section className="bg-matte-black pt-8 text-white">
      {currentUser && cartItems ? (
        <div className="flex justify-center xl:gap-28 gap-16 xl:pl-16 max-xl:grid max-xl:container">
          <div className="pt-[5rem] w-2/3 max-xl:w-full">
            <div className="flex items-center justify-between border-b-[1px] border-gray-400 py-4 mb-6">
              <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins] pl-4">
                Shopping Cart
              </h2>
              <h2 className="text-slate-50  text-3xl font-semibold font-[Poppins] max-lm:hidden pr-4">
                {quantity} {quantity > 1 ? 'Items' : 'Item'}
              </h2>
            </div>
            <table className="w-full">
              <thead className="h-14 max-lm:hidden">
                <tr className="bg-[#1B1B1B]">
                  <th className="text-left pl-4">PRODUCTS</th>
                  <th className="text-right">PRICE</th>
                  <th className="text-center">QUANTITY</th>
                  <th className="text-right pr-4">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onDelete={handleDelete}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#1B1B1B] xl:pt-[4.085rem] pt-4 w-1/3 max-xl:w-full pb-12">
            <div className="pt-[1.915rem] px-10">
              <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins] border-b-[1px] pb-4 border-gray-400">
                Order Summary
              </h2>
              <div className="pt-10">
                <div className="flex justify-between items-center pb-12">
                  <h4 className="text-base font-bold">ITEMS {totalItems}</h4>
                  <h4 className="text-base font-bold">${totalPrice}.00 USD</h4>
                </div>
                <h3 className="text-lg font-bold border-b-[1px] border-gray-400">
                  ADDITIONAL COSTS
                </h3>
                <div className="py-8 grid gap-8 border-b-[1px] border-gray-400">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">SHIPPING</h4>
                    <h4 className="text-base font-bold">
                      ${totalItems > 0 ? '5' : '0'}.00 USD
                    </h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">DISCOUNT</h4>
                    <h4 className="text-base font-bold">&mdash;</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">TAX</h4>
                    <h4 className="text-base font-bold">
                      ${totalItems * 1}.00 USD
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between py-8">
                  <h4 className="text-base font-bold">TOTAL COST</h4>
                  <h4 className="text-base font-bold">
                    ${totalPrice + addCosts}.00 USD
                  </h4>
                </div>
                {error && <p className="text-red-700 text-md mb-3">{error}</p>}
                <button
                  onClick={handleCheckout}
                  className="text-center py-2 w-full mb-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-full"
                >
                  Proceed To Checkout
                </button>
                <Link
                  to="/collections"
                  className="text-base font-bold text-blue-600 hover:text-blue-500"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ToLogin />
      )}
    </section>
  );
}
