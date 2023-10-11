import { useEffect } from 'react';
import PropTypes from 'prop-types';
import GeneratePrice from '../grid/GeneratePrice';

export default function PriceControl({ value, setValue, ID }) {
  useEffect(() => {
    if (value && value.initialPrice === null) {
      console.log(ID);

      const initialPrice = GeneratePrice(ID);

      setValue((prevSneaker) => ({
        ...prevSneaker,
        initialPrice,
      }));
    }
  }, [value, setValue, ID]);

  return <p className="text-lg font-bold">${value.initialPrice}.00</p>;
}

PriceControl.propTypes = {
  value: PropTypes.shape({
    initialPrice: PropTypes.number,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  ID: PropTypes.string,
};
