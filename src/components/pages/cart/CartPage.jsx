import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import ToLogin from './ToLogin';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [addCosts, setAddCosts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    currentUser,
    removeItem,
    updateCartItem,
    getItem,
    setQuantity,
    quantity,
  } = useAuth();

  useEffect(() => {
    getItem(setCartItems, 'users_cart');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    removeItem(ID, setCartItems, 'users_cart');
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (item, newQuantity) => {
    updateCartItem(item.id, newQuantity, setCartItems);
  };

  return (
    <section className="bg-matte-black pt-8 text-white">
      {currentUser && cartItems ? (
        <div className="flex justify-center xl:gap-28 gap-16 xl:pl-16 max-xl:grid max-xl:container">
          <div className="pt-[5rem] w-2/3 max-xl:w-full">
            <div className="flex items-center justify-between border-b-[1px] border-gray-400 py-4 mb-6">
              <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins]">
                Shopping Cart
              </h2>
              <h2 className="text-slate-50  text-3xl font-semibold font-[Poppins] max-lm:hidden">
                {quantity} {quantity > 1 ? 'Items' : 'Item'}
              </h2>
            </div>
            <table className="w-full">
              <thead className="h-14 max-lm:hidden">
                <tr>
                  <th className="text-left">PRODUCTS</th>
                  <th className="text-right">PRICE</th>
                  <th className="text-center">QUANTITY</th>
                  <th className="text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
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
                <button className="text-center py-2 w-full mb-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-full">
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
