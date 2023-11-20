import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showStatus } from '../../../utilities/ShowStatus';

import CheckoutItems from './CheckoutItems';
import CheckoutPayment from './CheckoutPayment';
import { useQuantity } from '../../../hooks/useQuantity';
import { addOrderInfo } from '../../../utilities/OrderFunctions';
import { removeItem } from '../../../utilities/ObjectDisplay';
import { getItem } from '../../../utilities/ObjectDisplay';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [cardUsed, setCardUsed] = useState('');
  const [billingUsed, setBillingUsed] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { currentUser } = useAuth();
  const { setQuantity } = useQuantity();

  const navigate = useNavigate();

  useEffect(() => {
    getItem('users_cart', currentUser, setCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function orderItems(addCosts, totalPrice, totalItems) {
    let orderCart = [];

    cartItems.forEach((item) =>
      orderCart.push({
        id: item.shoeID,
        brand: item.brand,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })
    );

    if (cardUsed && billingUsed) {
      addOrderInfo(
        cardUsed,
        billingUsed,
        orderCart,
        addCosts,
        totalPrice,
        totalItems,
        setError,
        setSuccess
      );

      setQuantity(0);
      navigate('/dashboard?mode=Order');
    } else {
      showStatus(
        'Please select your billing info and card info before you order.',
        setError
      );
    }

    cartItems.forEach((item) =>
      removeItem(item.id, null, 'users_cart', currentUser)
    );
  }

  return (
    <section className="flex bg-matte-black text-white">
      <div className="container flex flex-col justify-center gap-6 pt-[6rem] pb-12">
        <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-5 text-center">
          Checkout<span className="text-emerald-900">.</span>
        </h1>
        <div className="flex max-lg:flex-wrap-reverse">
          {currentUser && cartItems ? (
            <div className="bg-[#1B1B1B] xl:pt-[4.085rem] pt-8 w-full pb-12 checkout-container">
              <div className="pt-[1.915rem] px-10">
                <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins] border-b-[1px] pb-4 border-gray-400">
                  Order Summary
                </h2>
                <CheckoutItems
                  cartItems={cartItems}
                  orderItems={orderItems}
                  error={error}
                  success={success}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
              Loading Checkout
              <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
                ....
              </span>
            </h1>
          )}
          <CheckoutPayment
            setCardUsed={setCardUsed}
            setBillingUsed={setBillingUsed}
          />
        </div>
      </div>
    </section>
  );
}
