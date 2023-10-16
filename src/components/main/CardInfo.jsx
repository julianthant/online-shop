import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { ValidateCard, isDateValid, isCVVValid } from './ValidateCard';
import { showStatus } from '../../constants/ShowStatus';

export default function CardInfo({
  card,
  addCard,
  setAddCard,
  setCards,
  setSuccess,
  setError,
}) {
  const { addCardInfo, removeItem, updateCardInfo } = useAuth();
  const [editState, setEditState] = useState(addCard ? true : false);

  const [cardNumber, setCardNumber] = useState(addCard ? '' : card.cardNumber);
  const [cardName, setCardName] = useState(addCard ? '' : card.cardName);
  const [expiryDate, setExpiryDate] = useState(addCard ? '' : card.expiryDate);
  const [cvv, setCVV] = useState(addCard ? '' : card.cvv);

  const userStyles = 'font-bold text-[0.75rem] pb-1 text-light-gray';
  const userEdit =
    'bg-dark-gray w-1/2 text-sm text-slate-50 rounded-[0.22rem] h-9 hover:bg-light-gray transition-all';

  const handleSavePayment = (e) => {
    e.preventDefault();
    if (addCard) {
      if (!ValidateCard(cardNumber)) {
        return showStatus('Invalid card number', setError);
      }

      if (!isDateValid(expiryDate)) {
        return showStatus('Invalid date', setError);
      }

      if (!isCVVValid(cvv)) {
        return showStatus('Invalid CVV', setError);
      }

      addCardInfo(
        cardNumber,
        cardName,
        expiryDate,
        cvv,
        setCards,
        setError,
        setSuccess
      );

      setAddCard(false);
    } else {
      if (!ValidateCard(cardNumber)) {
        return showStatus('Invalid card number', setError);
      }

      if (!isDateValid(expiryDate)) {
        return showStatus('Invalid date', setError);
      }

      if (!isCVVValid(cvv)) {
        return showStatus('Invalid CVV', setError);
      }

      updateCardInfo(
        card.id,
        cardNumber,
        cardName,
        expiryDate,
        cvv,
        setCards,
        setError,
        setSuccess
      );
    }
  };

  function handleSave() {
    if (!addCard) {
      setEditState(false);
    }
  }

  function handleCancel() {
    if (addCard) {
      setAddCard(false);
    } else {
      setEditState(false);
    }
  }

  function handleDelete() {
    removeItem(card.id, setCards, 'users_cards');
    showStatus('Card has been deleted successfully', setSuccess);
  }

  const userFields = [
    {
      id: 'cardNumber',
      label: 'Card Number',
      value: cardNumber,
      setValue: setCardNumber,
      type: 'text',
      placeholder: 'Card Number',
    },
    {
      id: 'expiryDate',
      label: 'Expiry Date',
      value: expiryDate,
      setValue: setExpiryDate,
      type: 'text',
      placeholder: 'MM/YY',
    },
    {
      id: 'cvv',
      label: 'CVV',
      value: cvv,
      setValue: setCVV,
      type: 'text',
      placeholder: 'CVV',
    },
    {
      id: 'cardName',
      label: 'Name On Card',
      value: cardName,
      setValue: setCardName,
      type: 'text',
      placeholder: 'Card Name',
    },
  ];

  return (
    <>
      <div className={'pb-10'}>
        <form
          onSubmit={handleSavePayment}
          className="text-slate-50 py-6 px-6 rounded-md flex flex-wrap gap-5 bg-[#1B1B1B]"
        >
          {userFields.map((field) => (
            <div
              key={field.id}
              className={`flex flex-col max-sm:w-full ${
                field.id === 'cardNumber' || field.id === 'cardName'
                  ? 'w-full'
                  : 'w-[48.16%] max-xl:w-[47.87%] max-lg:w-[48.16%] max-md:w-[48.05%]'
              }`}
            >
              <p className={userStyles}>{field.label}</p>

              <label htmlFor={field.id}>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  disabled={!editState}
                  placeholder={field.placeholder}
                  onChange={(e) => field.setValue(e.target.value)}
                  required
                  className="bg-[#28282B] w-full py-2 px-3 rounded-[0.25rem] mt-1"
                />
              </label>
            </div>
          ))}
          {editState ? (
            <div className="flex w-full gap-3 pt-5 items-center">
              <button
                onClick={handleCancel}
                className="rounded-[0.22rem] bg-red-700 w-1/2 text-sm text-white h-9 hover:bg-red-500"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`${userEdit} w-1/2`}
                type={addCard ? 'submit' : 'button'}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex w-full gap-3 pt-5 items-center">
              <button
                onClick={handleDelete}
                className="rounded-[0.22rem] bg-red-700 w-1/2 text-sm text-white h-9 hover:bg-red-500"
                type="button"
              >
                Delete Card
              </button>
              <button
                onClick={() => setEditState(true)}
                className={`${userEdit} w-1/2`}
                type="submit"
              >
                Edit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

CardInfo.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    cardNumber: PropTypes.string,
    cardName: PropTypes.string,
    expiryDate: PropTypes.string,
    cvv: PropTypes.string,
  }),
  addCard: PropTypes.bool,
  setAddCard: PropTypes.func,
  setCards: PropTypes.func,
  setSuccess: PropTypes.func,
  setError: PropTypes.func,
};
