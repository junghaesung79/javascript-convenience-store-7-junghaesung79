export const isValidNumber = (input) => {
  if (!input || input.trim() !== input) return false;
  if (input.startsWith('0')) return false;
  if (input.length > 15) return false;

  const number = Number(input);
  if (!Number.isInteger(number)) return false;
  if (number.toString() !== input) return false;

  return true;
};
