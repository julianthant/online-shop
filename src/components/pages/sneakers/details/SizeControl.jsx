import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SizeControl({ ID, sizing, setSize }) {
  const firstFourChars = ID.substring(0, 4);
  const dropdownRef = useRef(null);
  const sizes = [];

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

  const handleSizeDropdownClick = () => {
    setSizeDropdownVisible(!sizeDropdownVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('size-dropdown')
      ) {
        setSizeDropdownVisible(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSize(size);
    setSizeDropdownVisible(false);
  };

  for (let i = 0; i < firstFourChars.length; i++) {
    const char = firstFourChars.charAt(i);

    if (/^[0-9]$/.test(char)) {
      let size = parseInt(char, 10);

      if (sizing === 'man') {
        if (size < 3) {
          size += 6.5;
        } else if (size < 5) {
          size += 5.5;
        }
      } else {
        if (size < 3) {
          size += 4.5;
        } else if (size < 5) {
          size += 5.5;
        }
      }

      sizes.push(size);
    } else if (/^[A-La-l]$/.test(char)) {
      let size = char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;

      if (sizing === 'man') {
        if (size < 3) {
          size += 6.5;
        } else if (size < 5) {
          size += 5.5;
        }
      } else {
        if (size < 3) {
          size += 4.5;
        } else if (size < 5) {
          size += 5.5;
        }
      }

      sizes.push(size);
    }
  }

  const addPointFiveToDuplicate = (arr) => {
    const duplicateSizes = {};
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const size = arr[i];

      let modifiedSize = size;
      while (duplicateSizes[modifiedSize]) {
        modifiedSize += 0.5;
      }

      duplicateSizes[modifiedSize] = true;
      result.push(modifiedSize);
    }

    return result;
  };

  const modifiedSizes = addPointFiveToDuplicate(sizes);
  modifiedSizes.sort((a, b) => a - b);

  return (
    <div className="flex items-center">
      <p className="text-gray-600 w-28">Sizes:</p>
      <div className="relative sidebar-container">
        <button
          onClick={handleSizeDropdownClick}
          className="h-10 border border-gray-300 p-2 text-left focus:outline-none w-full size-dropdown"
        >
          {selectedSize || 'Select Size'}
        </button>
        {sizeDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-10 mt-2 bg-white border border-gray-300 shadow-lg w-full z-10"
          >
            <ul className="py-2">
              {modifiedSizes.map((size) => (
                <li
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="cursor-pointer px-4 py-1 hover:bg-gray-100"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

SizeControl.propTypes = {
  ID: PropTypes.string.isRequired,
  sizing: PropTypes.string.isRequired,
  setSize: PropTypes.func,
};
