export const isInvalidNumber = (input) => {
  if (!Number.isInteger(input)) return true;
  if (input <= 0) return true;
  if (input.toString().length > 15) return true;

  return false;
};
