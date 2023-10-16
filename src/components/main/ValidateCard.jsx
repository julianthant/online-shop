/* eslint-disable react-refresh/only-export-components */
export function ValidateCard(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Check if the card number has a valid length
  if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
    return false; // Card number should contain only digits and be 13 to 19 characters long.
  }

  // Validate the card using the Luhn algorithm
  let sum = 0;
  let doubleUp = false;

  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber[i], 10);

    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleUp = !doubleUp;
  }

  if (sum % 10 !== 0) {
    return false;
  }

  // Check the card's issuer (BIN/IIN) to determine its brand
  const issuerRegex = {
    Visa: /^4/,
    MasterCard: /^5[1-5]/,
    AmericanExpress: /^3[47]/,
    Discover: /^6(?:011|5)/,
    // Add more issuer patterns as needed
  };

  for (const brand in issuerRegex) {
    if (issuerRegex[brand].test(cleanedCardNumber)) {
      return brand; // Return the card brand if a match is found
    }
  }

  return false; // No valid issuer found
}

export function isDateValid(date) {
  // Date should be in the format MM/YY
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!dateRegex.test(date)) {
    return false;
  }

  // Split the date into month and year
  const [month, year] = date.split('/');

  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  // Check if the entered year is not in the past
  if (parseInt(year, 10) < currentYear) {
    return false;
  } else if (parseInt(year, 10) === currentYear) {
    // If the year is the current year, check if the month is not in the past
    if (parseInt(month, 10) < currentMonth) {
      return false;
    }
  }

  return true;
}

export function isCVVValid(cvv) {
  // CVV should be a 3 or 4 digit number
  const cvvRegex = /^\d{3,4}$/;

  return cvvRegex.test(cvv);
}
