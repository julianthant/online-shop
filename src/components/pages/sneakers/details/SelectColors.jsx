import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function SelectColors({ value, setClick, setItems }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleColorDropdownClick = () => {
    setColorDropdownVisible(!colorDropdownVisible);
    setClick(!colorDropdownVisible);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorDropdownVisible(false);
    setClick(false);
  };

  const availableColors = [...new Set(value.colorway.split('/'))];

  useEffect(() => {
    const uniqueColors = [...new Set(value.colorway.split('/'))];
    setItems(uniqueColors.length);
  }, [value.colorway, setItems]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('color-dropdown')
      ) {
        setColorDropdownVisible(false);
        setClick(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setClick]);

  return (
    <div className="flex items-center">
      <p className="text-gray-600 w-28">Colors:</p>
      <div className="relative sidebar-container">
        <button
          onClick={handleColorDropdownClick}
          className="h-10 border border-gray-300 p-2 text-left focus:outline-none w-full color-dropdown"
        >
          {selectedColor || 'Select Color'}
        </button>
        {colorDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-10 mt-2 bg-white border border-gray-300 shadow-lg w-full"
          >
            <ul className="py-2">
              {availableColors.map((color) => (
                <li
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className="cursor-pointer px-4 py-1 hover:bg-gray-100"
                >
                  {color}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

SelectColors.propTypes = {
  value: PropTypes.shape({
    colorway: PropTypes.string,
  }),
  setClick: PropTypes.func,
  setItems: PropTypes.func,
};
