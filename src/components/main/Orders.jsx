import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { getItem } from '../../utilities/ObjectDisplay';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getItem('users_orders', currentUser, setOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-matte-black lg:mt-[10rem] text-white order-container px-5">
      <div className="xl:gap-28 gap-16 xl:pl-16 max-xl:grid">
        <table className="w-full max-md:hidden">
          <thead>
            <tr className="border-b-[1px] border-gray-400 lm:py-4 h-10 text-left text-slate-50 text-lg">
              <th className="max-lm:text-4xl max-lm:text-center font-semibold font-[Poppins] pl-4">
                Order
              </th>
              <th className="font-semibold font-[Poppins] max-lm:hidden">
                Date
              </th>
              <th className="font-semibold font-[Poppins] max-lm:hidden">
                Quantity
              </th>
              <th className="font-semibold font-[Poppins] max-lm:hidden">
                Status
              </th>
              <th className="font-semibold text-right font-[Poppins] max-lm:hidden pr-4">
                Total
              </th>
            </tr>
          </thead>
          {currentUser && orders > 0 ? (
            <tbody>
              <tr className="h-3"></tr>
              {orders.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </tbody>
          ) : (
            <tr className="font-[Poppins] h-10 tex5-left text-sm mobile-order">
              <td className="text-left pl-4 text-blue-700 underline">##</td>
              <td>##</td>
              <td>##</td>
              <td>##</td>
              <td className="text-right w-28 pr-4">##</td>
            </tr>
          )}
        </table>
        <div className="md:hidden">
          <h1 className="font-bold text-4xl text-slate-50 text-center mb-2">
            Orders
          </h1>
          {orders ? (
            orders.map((item) => (
              <ul
                key={item.id}
                className="py-8 grid gap-2 border-b-[1px] border-gray-400"
              >
                <li className="flex items-center justify-between h-10 px-5">
                  <h4 className="text-base font-bold">Order ID</h4>
                  <h4 className="text-base font-bold text-blue-700 underline">
                    #<Link to={`/order/${item.id}`}>{item.id}</Link>
                  </h4>
                </li>

                <li className="flex items-center justify-between h-10 px-5 bg-[#1B1B1B]">
                  <h4 className="text-base font-bold">DATE</h4>
                  <h4 className="text-base font-bold">
                    {orderDate(item.createdAt)}
                  </h4>
                </li>
                <li className="flex items-center justify-between h-10 px-5">
                  <h4 className="text-base font-bold">QUANTITY</h4>
                  <h4 className="text-base font-bold">
                    {item.totalItems} Items
                  </h4>
                </li>
                <li className="flex items-center justify-between h-10 px-5 bg-[#1B1B1B]">
                  <h4 className="text-base font-bold">STATUS</h4>
                  <h4 className="text-base font-bold">Pending</h4>
                </li>
                <li className="flex items-center justify-between h-10 px-5">
                  <h4 className="text-base font-bold">TOTAL</h4>
                  <h4 className="text-base font-bold">
                    ${item.totalPrice}.00 USD
                  </h4>
                </li>
              </ul>
            ))
          ) : (
            <ul className="py-8 grid gap-2 border-b-[1px] border-gray-400">
              <li className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">Order ID</h4>
                <h4 className="text-base font-bold text-blue-700 underline">
                  ##
                </h4>
              </li>

              <li className="flex items-center justify-between h-10 px-5 bg-[#1B1B1B]">
                <h4 className="text-base font-bold">DATE</h4>
                <h4 className="text-base font-bold">##</h4>
              </li>
              <li className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">QUANTITY</h4>
                <h4 className="text-base font-bold">##</h4>
              </li>
              <li className="flex items-center justify-between h-10 px-5 bg-[#1B1B1B]">
                <h4 className="text-base font-bold">STATUS</h4>
                <h4 className="text-base font-bold">##</h4>
              </li>
              <li className="flex items-center justify-between h-10 px-5">
                <h4 className="text-base font-bold">TOTAL</h4>
                <h4 className="text-base font-bold">##</h4>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function orderDate(timestamp) {
  if (timestamp) {
    let date = timestamp.toDate();

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } else {
    let date = new Date();

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }
}

function OrderItem({ item }) {
  return (
    <tr className="font-[Poppins] h-10 tex5-left text-sm mobile-order">
      <td className="text-left pl-4 text-blue-700 underline">
        #<Link to={`/order/${item.id}`}>{item.id}</Link>
      </td>
      <td>{orderDate(item.createdAt)}</td>
      <td>
        {item.totalItems} {item.totalItems > 1 ? 'Items' : 'Item'}
      </td>
      <td>Pending</td>
      <td className="text-right w-28 pr-4">${item.totalPrice}.00 USD</td>
    </tr>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number,
        image: PropTypes.string,
        quantity: PropTypes.number,
      })
    ).isRequired,
    createdAt: PropTypes.instanceOf(Timestamp),
    totalPrice: PropTypes.number,
    totalItems: PropTypes.number,
  }).isRequired,
};
