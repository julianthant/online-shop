import { useState } from 'react';
import PropTypes from 'prop-types';
import { addBillingInfo } from '../../constants/PaymentFunctions';
import { updateBillingInfo } from '../../constants/PaymentFunctions';
import { removeItem } from '../../constants/ObjectDisplay';
import { showStatus } from '../../constants/ShowStatus';
import { useAuth } from '../../hooks/useAuth';

export default function BillingInfo({
  addBilling,
  setAddBilling,
  setBilling,
  billing,
  setSuccess,
  setError,
}) {
  const [editState, setEditState] = useState(addBilling ? true : false);

  const [address, setAddress] = useState(addBilling ? '' : billing.address);
  const [country, setCountry] = useState(addBilling ? '' : billing.country);
  const [city, setCity] = useState(addBilling ? '' : billing.city);
  const [state, setState] = useState(addBilling ? '' : billing.state);
  const [postalCode, setPostalCode] = useState(
    addBilling ? '' : billing.postalCode
  );

  const userStyles = 'font-bold text-[0.75rem] pb-1 text-light-gray';
  const userEdit =
    'bg-dark-gray w-1/2 text-sm text-slate-50 rounded-[0.22rem] h-9 hover:bg-light-gray transition-all';

  const { currentUser } = useAuth();

  const handleSaveBilling = (e) => {
    e.preventDefault();
    if (addBilling) {
      addBillingInfo(
        address,
        country,
        city,
        state,
        postalCode,
        setBilling,
        setError,
        setSuccess,
        currentUser
      );

      setAddBilling(false);
    } else {
      updateBillingInfo(
        billing.id,
        address,
        country,
        city,
        state,
        postalCode,
        setBilling,
        setError,
        setSuccess,
        currentUser
      );
    }
  };

  function handleSave() {
    if (!addBilling) {
      setEditState(false);
    }
  }

  function handleCancel() {
    if (addBilling) {
      setAddBilling(false);
    } else {
      setEditState(false);
    }
  }

  function handleDelete() {
    removeItem(billing.id, setBilling, 'users_billing');
    showStatus('Billing info has been deleted successfully', setSuccess);
  }

  const userFields = [
    {
      id: 'country',
      label: 'Country',
      value: country,
      setValue: setCountry,
      type: 'text',
      placeholder: 'Country',
      width:
        'max-sm:w-full w-[66.213%] max-xl:w-[66%] max-lg:w-[66.213%] max-md:w-[66.15%]',
    },
    {
      id: 'city',
      label: 'City',
      value: city,
      setValue: setCity,
      type: 'text',
      placeholder: 'City',
      width:
        'max-sm:w-full w-[30.1%] max-xl:w-[29.74%] max-lg:w-[30.1%] max-md:w-[30.02%]',
    },
    {
      id: 'address',
      label: 'Address',
      value: address,
      setValue: setAddress,
      type: 'text',
      placeholder: 'Address',
      width: 'max-sm:w-full w-[100%]',
    },
    {
      id: 'state',
      label: 'State/Province',
      value: state,
      setValue: setState,
      type: 'text',
      placeholder: 'State/Province',
      width:
        'max-sm:w-full w-[48.16%] max-xl:w-[47.87%] max-lg:w-[48.16%] max-md:w-[48.05%]',
    },
    {
      id: 'postalCode',
      label: 'Postal Code',
      value: postalCode,
      setValue: setPostalCode,
      type: 'text',
      placeholder: 'Postal Code',
      width:
        'max-sm:w-full w-[48.16%] max-xl:w-[47.87%] max-lg:w-[48.16%] max-md:w-[48.05%]',
    },
  ];

  return (
    <>
      <div className="pb-10">
        <form
          onSubmit={handleSaveBilling}
          className="text-slate-50 py-6 px-6 rounded-md flex flex-wrap gap-5 bg-[#1B1B1B]"
        >
          {userFields.map((field) => (
            <div key={field.id} className={`flex flex-col ${field.width}`}>
              <p className={userStyles}>{field.label}</p>
              <label htmlFor={field.id}>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  readOnly={!editState}
                  placeholder={field.placeholder}
                  onChange={(e) => field.setValue(e.target.value)}
                  required
                  className="bg-[#28282B] py-2 px-3 rounded-[0.25rem] mt-1 w-full"
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
                type={addBilling ? 'submit' : 'button'}
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
                Delete Billing Info
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

BillingInfo.propTypes = {
  billing: PropTypes.shape({
    id: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  addBilling: PropTypes.bool,
  setBilling: PropTypes.func,
  setAddBilling: PropTypes.func,
  setSuccess: PropTypes.func,
  setError: PropTypes.func,
};
