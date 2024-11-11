import Printer from '../io/Printer.js';
import * as CONFIG from '../cosntants/config.js';

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
