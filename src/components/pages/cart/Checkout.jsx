import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { showStatus } from '../../../constants/ShowStatus';
import Select from 'react-select';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [cards, setCards] = useState([]);
  const [billing, setBilling] = useState([]);
  const [cardOptions, setCardOptions] = useState([]);
  const [billingOptions, setBillingOptions] = useState([]);
  const [error, setError] = useState(false);

  const [addCosts, setAddCosts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { currentUser, getItem } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getItem(setCartItems, 'users_cart');
    getItem(setCards, 'users_cards');
    getItem(setBilling, 'users_billing');

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

  useEffect(() => {
    if (cards) {
      const newCardOptions = cards.map((card) => ({
        value: card.id,
        label: `**** **** **** ${card.cardNumber.toString().slice(-4)}`,
      }));
      setCardOptions(newCardOptions);
    }
  }, [cards]);

  useEffect(() => {
    if (billing) {
      const newBillingOptions = billing.map((billing) => ({
        value: billing.id,
        label: `Address in ${billing.city}`,
      }));
      setBillingOptions(newBillingOptions);
    }
  }, [billing]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      backgroundColor: 'transparent',
      border: state.menuIsOpen ? '1px solid #10b981' : '1px solid #CED4DA',
      borderRadius: '0px',
      width: '100%',
      paddingInline: '0.4rem',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #10b981',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#059669' : 'transparent',
      borderRadius: '0px',
      color: 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#059669' : '#34d39930',
        color: 'black',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

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
                <div className="pt-10">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center pb-12"
                    >
                      <h4 className="text-base font-bold">{item.name}</h4>
                      <h4 className="text-base font-bold px-8">
                        {item.quantity}
                      </h4>
                      <h4 className="text-base font-bold">
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
                  <p className="text-red-700 text-md mb-3">{error}</p>
                  <button className="text-center py-2 w-full mb-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-full">
                    Order Now
                  </button>
                  <Link
                    to="/cart"
                    className="text-base font-bold text-blue-600 hover:text-blue-500"
                  >
                    &larr; Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
              Loading Sneakers
              <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
                ....
              </span>
            </h1>
          )}

          <div className="xl:pt-[4.085rem] pt-8 w-full pb-12 lg:pl-20">
            <div className="pt-[1.915rem] lg:px-10">
              <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins] border-b-[1px] pb-4 border-gray-400">
                Payment Method
              </h2>
              <h3 className="text-lg font-bold  border-gray-400 pt-10 mb-2">
                SELECT CARD
              </h3>
              <Select
                options={cardOptions}
                styles={customStyles}
                isSearchable={false}
              />
              <h3 className="text-lg font-bold  border-gray-400 pt-10 mb-2">
                SELECT BILLING INFO
              </h3>
              <Select
                options={billingOptions}
                styles={customStyles}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
