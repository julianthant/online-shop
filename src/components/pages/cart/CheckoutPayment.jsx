import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import PropTypes from 'prop-types';

export default function CheckoutPayment({ setCardUsed, setBillingUsed }) {
  const [cards, setCards] = useState([]);
  const [billing, setBilling] = useState([]);

  const [cardOptions, setCardOptions] = useState([]);
  const [billingOptions, setBillingOptions] = useState([]);

  const { getItem } = useAuth();

  useEffect(() => {
    getItem(setCards, 'users_cards');
    getItem(setBilling, 'users_billing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const newBillingOptions = billing.map((billing, index) => ({
        value: billing.id,
        label: `Address Line ${index + 1} in ${billing.city}`,
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
    <div className="xl:pt-[4.085rem] pt-8 w-full pb-12 lg:pl-20">
      <div className="pt-[1.915rem] lg:px-10">
        <h2 className="text-slate-50 text-3xl font-semibold font-[Poppins] border-b-[1px] pb-4 border-gray-400">
          Payment Method
        </h2>
        <h3 className="text-lg font-bold  border-gray-400 pt-10 mb-2">
          SELECT CARD
        </h3>
        <Select
          value={cardOptions.find((opt) => opt.value === cardOptions)}
          onChange={(selectedOption) => setCardUsed(selectedOption.value)}
          options={cardOptions}
          styles={customStyles}
          isSearchable={false}
        />
        <h3 className="text-lg font-bold  border-gray-400 pt-10 mb-2">
          SELECT BILLING INFO
        </h3>
        <Select
          value={billingOptions.find((opt) => opt.value === billingOptions)}
          onChange={(selectedOption) => setBillingUsed(selectedOption.value)}
          options={billingOptions}
          styles={customStyles}
          isSearchable={false}
        />
      </div>
    </div>
  );
}

CheckoutPayment.propTypes = {
  setCardUsed: PropTypes.func.isRequired,
  setBillingUsed: PropTypes.func.isRequired,
};
