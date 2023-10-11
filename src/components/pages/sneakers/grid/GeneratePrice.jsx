export default function GeneratePrice(id) {
  if (id) {
    const charToNumber = (char, firstChar) => {
      const upperChar = char.toUpperCase();
      const offset = firstChar ? 0 : 10;
      if (upperChar >= 'A' && upperChar <= 'I') {
        return upperChar.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + offset;
      } else if (upperChar >= 'J' && upperChar <= 'R') {
        return upperChar.charCodeAt(0) - 'J'.charCodeAt(0) + 1 + offset;
      } else if (upperChar >= 'S' && upperChar <= 'Z') {
        return upperChar.charCodeAt(0) - 'S'.charCodeAt(0) + 1;
      }
      return (parseInt(upperChar, 36) % 10) + offset; // Map numbers and other characters
    };

    let firstChar = id[0];
    let firstNumber = charToNumber(firstChar, true);

    if (firstNumber > 5) {
      firstNumber -= 5;
    }

    let secondChar = id[1];
    let secondNumber = charToNumber(secondChar, false);

    // Ensure the second number is within 0 to 5 range
    if (secondNumber > 5) {
      secondNumber = secondNumber % 6;
    }

    // Combine the two numbers and add '0' at the end
    let price = `${firstNumber}${secondNumber}0`;

    return parseInt(price, 10);
  }
  return 0; // Default for empty or null input
}
