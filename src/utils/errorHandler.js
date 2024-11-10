import Printer from '../io/Printer.js';
import * as CONFIG from '../cosntants/config.js';

export const tryAgainUntilValid = (fn) => {
  while (true) {
    try {
      return fn();
    } catch (error) {
      Printer.print(error.message);
    }
  }
};

export const throwError = (message) => {
  throw new Error(`${CONFIG.errorPrefix} ${message}`);
};
