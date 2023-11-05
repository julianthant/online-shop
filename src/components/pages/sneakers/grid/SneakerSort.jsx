import { useState } from 'react';
import GeneratePrice from './GeneratePrice';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default function SneakerSort({
  filteredSneakers,
  setFilteredSneakers,
  originalSneakers,
}) {
  const [sortOption, setSortOption] = useState('default');

  const handleSortChange = (option) => {
    setSortOption(option);
    sortSneakers(option);
  };

  const sortSneakers = (option) => {
    let sortedSneakers = [...filteredSneakers];

    switch (option) {
      case 'ascendingPrice':
        sortedSneakers.sort((a, b) => {
          if (a.initialPrice === null) a.initialPrice = GeneratePrice(a.id);
          if (b.initialPrice === null) b.initialPrice = GeneratePrice(b.id);
          return a.initialPrice - b.initialPrice;
        });
        break;
      case 'descendingPrice':
        sortedSneakers.sort((a, b) => {
          if (a.initialPrice === null) a.initialPrice = GeneratePrice(a.id);
          if (b.initialPrice === null) b.initialPrice = GeneratePrice(b.id);
          return b.initialPrice - a.initialPrice;
        });
        break;
      case 'ascendingName':
        sortedSneakers.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'descendingName':
        sortedSneakers.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case 'default':
        sortedSneakers = [...originalSneakers];
        break;
      default:
        break;
    }

    setFilteredSneakers(sortedSneakers);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      backgroundColor: 'transparent',
      border: state.menuIsOpen ? '1px solid #10b981' : '1px solid #CED4DA',
      borderRadius: '0px',
      width: '16rem',
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
      width: '16rem',
      color: 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#059669' : '#34d39930',
        color: 'black',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0px',
      width: '16rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  const options = [
    { value: 'default', label: 'Default sorting' },
    { value: 'ascendingPrice', label: 'Ascending Price' },
    { value: 'descendingPrice', label: 'Descending Price' },
    { value: 'ascendingName', label: 'Ascending Name' },
    { value: 'descendingName', label: 'Descending Name' },
  ];

  return (
    <Select
      value={options.find((opt) => opt.value === sortOption)}
      onChange={(selectedOption) => handleSortChange(selectedOption.value)}
      options={options}
      styles={customStyles}
      isSearchable={false}
    />
  );
}

SneakerSort.propTypes = {
  filteredSneakers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      initialPrice: PropTypes.number,
    })
  ),
  setFilteredSneakers: PropTypes.func.isRequired,
  originalSneakers: PropTypes.array.isRequired,
};
