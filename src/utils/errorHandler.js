import { Printer } from '../io/index.js';
import { CONFIG } from '../constants/index.js';

export const retryUntilValid = async (fn) => {
  while (true) {
    try {
      return await fn();
    } catch (error) {
      Printer.print(error.message);
    }
  }
};

export const throwError = (message) => {
  throw new Error(`${CONFIG.errorPrefix} ${message}`);
};
