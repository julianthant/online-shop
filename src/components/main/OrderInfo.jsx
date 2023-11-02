import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OrderInfo() {
  const [order, setOrder] = useState();
  const [error, setError] = useState('');
  const [date, setDate] = useState(null);

  const { currentUser, getOrder } = useAuth();
  const { orderID } = useParams();

  useEffect(() => {
    getOrder(orderID, setOrder, setDate, setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    currentUser &&
    order && (
      <section className="bg-matte-black text-white">
        <div className="container flex flex-col justify-center gap-6 pt-[6rem] pb-12">
          <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-5 text-center">
            Order Details
            <span className="text-emerald-900">.</span>
          </h1>
          <h3 className="text-lg font-bold border-b-[1px] px-5 border-gray-400 border-opacity-70 h-8">
            PRODUCTS
          </h3>
          {order.cartItems.map((item, index) => (
            <div
              key={item.id}
              className={`pt-4 grid gap-2 ${
                index !== order.cartItems.length - 1
                  ? 'border-b-[1px] border-gray-400 pb-12 border-opacity-40'
                  : 'pb-4'
              }`}
            >
              <div className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">NAME</h4>
                <Link
                  to={`/sneaker-grid/${item.brand}/${item.id}`}
                  className="text-base font-bold text-blue-700 underline"
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between h-10 px-5 bg-[#1b1b1b]">
                <h4 className="text-base font-bold">BRAND</h4>
                <h4 className="text-base font-bold">{item.brand}</h4>
              </div>
              <div className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">PRICE</h4>
                <h4 className="text-base font-bold">${item.price}.00 USD</h4>
              </div>
              <div className="flex items-center justify-between h-10 px-5 bg-[#1b1b1b]">
                <h4 className="text-base font-bold">QUANTITY</h4>
                <h4 className="text-base font-bold">
                  {item.quantity} {item.quantity > 1 ? 'Items' : 'Item'}
                </h4>
              </div>
              <div className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">TOTAL</h4>
                <h4 className="text-base font-bold">
                  ${item.price * item.quantity}.00 USD
                </h4>
              </div>
            </div>
          ))}
          <h3 className="text-lg px-5 font-bold border-b-[1px] border-gray-400 border-opacity-70 h-8">
            ADDITIONAL INFO
          </h3>
          <div className="py-4 grid gap-2">
            <div className="flex items-center justify-between h-10 px-5">
              <h4 className="text-base font-bold">ORDERED DATE</h4>
              <h4 className="text-base font-bold">
                {date && date.toDateString()}
              </h4>
            </div>
            <div className="flex items-center justify-between h-10 px-5 bg-[#1b1b1b]">
              <h4 className="text-base font-bold">ETA</h4>
              <h4 className="text-base font-bold">2 to 3 weeks</h4>
            </div>
            <div className="flex items-center justify-between h-10 px-5">
              <h4 className="text-base font-bold">STATUS</h4>
              <h4 className="text-base font-bold">Pending</h4>
            </div>
            <div className="flex items-center justify-between h-10 px-5 bg-[#1b1b1b]">
              <h4 className="text-base font-bold">TOTAL ITEMS</h4>
              <h4 className="text-base font-bold">
                {order.totalItems} {order.totalItems > 1 ? 'Items' : 'Item'}
              </h4>
            </div>
          </div>
          <h3 className="text-lg px-5 font-bold border-b-[1px] border-gray-400 border-opacity-70 h-8">
            ADDITIONAL COSTS
          </h3>
          <div className="py-4 grid gap-2 border-b-[1px] border-gray-400 border-opacity-70">
            <div className="flex items-center justify-between h-10 px-5">
              <h4 className="text-base font-bold">SHIPPING</h4>
              <h4 className="text-base font-bold">
                ${order.totalItems > 0 ? 5 : 0}.00 USD
              </h4>
            </div>
            <div className="flex items-center justify-between h-10 px-5 bg-[#1b1b1b]">
              <h4 className="text-base font-bold">DISCOUNT</h4>
              <h4 className="text-base font-bold">&mdash;</h4>
            </div>
            <div className="flex items-center justify-between h-10 px-5 pb-4">
              <h4 className="text-base font-bold">TAX</h4>
              <h4 className="text-base font-bold">
                ${order.totalItems * 1}.00 USD
              </h4>
            </div>
          </div>
          <div className="flex items-center justify-between h-10 px-5 py-8">
            <h4 className="text-base font-bold">TOTAL COST</h4>
            <h4 className="text-base font-bold">
              ${order.totalPrice + order.addCosts}.00 USD
            </h4>
          </div>
          {error && <p className="text-red-700 text-md mb-3">{error}</p>}
        </div>
      </section>
    )
  );
}
