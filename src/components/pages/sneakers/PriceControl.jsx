import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PriceControl({ value, setValue }) {
  useEffect(() => {
    if (value && value.initialPrice === null) {
      const id = value.id;
      let price = '';
      for (let i = 0; i < id.length; i++) {
        if (id[i] < '5' && !isNaN(id[i])) {
          price += id[i];
          if (i + 1 < id.length && !isNaN(id[i + 1])) {
            price += id[i + 1];
            break;
          }
        }
      }
      price += '0';
      setValue((prevSneaker) => ({
        ...prevSneaker,
        initialPrice: parseInt(price, 10),
      }));
    }
  }, [value, setValue]);

  return <p className="text-lg font-bold">${value.initialPrice}.00</p>;
}

PriceControl.propTypes = {
  value: PropTypes.shape({
    initialPrice: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
};
