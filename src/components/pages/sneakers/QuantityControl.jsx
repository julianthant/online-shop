import PropTypes from 'prop-types';

export default function QuantityControl({ value, setValue }) {
  const handleIncrementQuantity = () => {
    if (value < 100) {
      setValue((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrementQuantity = () => {
    if (value > 1) {
      setValue((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleChangeQuantity = (event) => {
    const newValue = parseInt(event.target.value, 1);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <p className="text-gray-600 w-28">QTY:</p>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={handleDecrementQuantity}
            className="border border-gray-300 p-1 w-9 h-9 flex items-center justify-center pb-[0.4rem]"
          >
            <span className="block text-gray-600 text-2xl text-center">-</span>
          </button>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChangeQuantity}
          className="text-center p-1 w-11 h-9 border border-gray-300 focus:shadow-xl focus:outline-none"
        />
        <div className="relative">
          <button
            onClick={handleIncrementQuantity}
            className="border border-gray-300 p-1 w-9 h-9 flex items-center justify-center"
          >
            <span className="text-gray-600 text-center text-2xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

QuantityControl.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};
