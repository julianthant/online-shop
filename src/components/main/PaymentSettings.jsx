import CardInfo from './CardInfo';
import BillingInfo from './BillingInfo';
import { useState, useEffect, useRef } from 'react';
import { getItem } from '../../utilities/ObjectDisplay';
import { useAuth } from '../../hooks/useAuth';

export default function PaymentSettings() {
  const addCardRef = useRef(null);
  const [cards, setCards] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [cardError, setCardError] = useState('');
  const [cardSuccess, setCardSuccess] = useState('');

  const [billing, setBilling] = useState([]);
  const [addBilling, setAddBilling] = useState(false);
  const [billingError, setBillingError] = useState('');
  const [billingSuccess, setBillingSuccess] = useState('');

  const { currentUser } = useAuth();

  useEffect(() => {
    getItem('users_cards', currentUser, setCards);
    getItem('users_billing', currentUser, setBilling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addCard) {
      addCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [addCard]);

  function handleAddCard() {
    setAddCard(true);
  }

  function handleAddBilling() {
    setAddBilling(true);
  }

  return (
    <div className="lg:ml-28 lg:mt-[10rem] mx-auto payment-container">
      <h1 className="font-bold text-4xl text-slate-50 text-center">
        Billing Settings
      </h1>
      <button
        disabled={addBilling}
        onClick={handleAddBilling}
        className="bg-dark-gray w-full my-10 text-sm text-slate-50 rounded-[0.22rem] h-9 hover:bg-light-gray transition-all disabled:brightness-50 disabled:hover:bg-dark-gray"
      >
        Add Billing Address
      </button>
      {billingError && (
        <p className="text-red-700 text-md mb-3">{billingError}</p>
      )}
      {billingSuccess && (
        <p className="text-green-700 text-md mb-3">{billingSuccess}</p>
      )}
      {addBilling && (
        <BillingInfo
          addBilling={addBilling}
          setAddBilling={setAddBilling}
          setBilling={setBilling}
          setSuccess={setBillingSuccess}
          setError={setBillingError}
        />
      )}
      {billing &&
        billing.map((info) => (
          <BillingInfo
            key={info.id}
            billing={info}
            setBilling={setBilling}
            setSuccess={setBillingSuccess}
            setError={setBillingError}
          />
        ))}
      <div className="border-above">
        <h1 className="font-bold text-4xl text-slate-50 text-center py-10">
          Card Settings
        </h1>
      </div>
      <button
        disabled={addCard}
        onClick={handleAddCard}
        className="bg-dark-gray w-full mb-10 text-sm text-slate-50 rounded-[0.22rem] h-9 hover:bg-light-gray transition-all disabled:brightness-50 disabled:hover:bg-dark-gray"
      >
        Add New Card
      </button>
      {cardError && <p className="text-red-700 text-md mb-3">{cardError}</p>}
      {cardSuccess && (
        <p className="text-green-700 text-md mb-3">{cardSuccess}</p>
      )}
      {addCard && (
        <CardInfo
          addCard={addCard}
          setAddCard={setAddCard}
          setCards={setCards}
          setSuccess={setCardSuccess}
          setError={setCardError}
        />
      )}
      <div ref={addCardRef} />
      {cards &&
        cards.map((card) => (
          <CardInfo
            card={card}
            setCards={setCards}
            key={card.id}
            setSuccess={setCardSuccess}
            setError={setCardError}
          />
        ))}
    </div>
  );
}
