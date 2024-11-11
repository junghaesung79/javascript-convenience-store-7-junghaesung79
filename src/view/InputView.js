import { MESSAGES, ORDER_MESSAGES } from '../constants/index.js';
import { Reader } from '../io/index.js';
import { AskHandler, OrderHandler } from '../services/index.js';
import { retryUntilValid } from '../utils/errorHandler.js';

class InputView {
  static getOrder = async () => {
    return await retryUntilValid(async () => {
      const answer = await Reader.readLine(MESSAGES.getOrder);
      return OrderHandler.format(answer);
    });
  };

  static askMembership = async () => {
    return await retryUntilValid(async () => {
      const answer = await Reader.readLine(MESSAGES.askMembership);
      return AskHandler.getWhether(answer);
    });
  };

  static askToContinue = async () => {
    return await retryUntilValid(async () => {
      const answer = await Reader.readLine(MESSAGES.askToContinue);
      return AskHandler.getWhether(answer);
    });
  };

  static #askAddItem = async () => {
    return await retryUntilValid(async () => {
      const answer = await Reader.readLine(ORDER_MESSAGES.askAddItem);
      return AskHandler.getWhether(answer);
    });
  };

  static #askRemoveItems = async () => {
    return await retryUntilValid(async () => {
      const answer = await Reader.readLine(ORDER_MESSAGES.askRemoveItems);
      return AskHandler.getWhether(answer);
    });
  };

  static async askPromotions(bundles) {
    return Promise.all(bundles.map(this.#handlePromotionBundle));
  }

  static #handlePromotionBundle = async ({ category, bundle }) => {
    const newCategory = await this.#getNewCategory(category);
    return { category: newCategory, bundle };
  };

  static #getNewCategory = async (category) => {
    switch (category) {
      case 'add':
        return (await this.#askAddItem()) ? 'add' : 'default';
      case 'remove':
        return (await this.#askRemoveItems()) ? 'default' : 'remove';
      default:
        return await category;
    }
  };
}

export default InputView;
