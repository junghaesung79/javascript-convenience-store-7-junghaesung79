import { MESSAGES, ORDER_MESSAGES } from '../constants/index.js';
import { Reader } from '../io/index.js';
import { AskHandler, OrderHandler } from '../services/index.js';
import { retryUntilValid } from '../utils/errorHandler.js';

class InputView {
  static #createInputHandler(message, handler) {
    return async () => {
      return retryUntilValid(async () => {
        const answer = await Reader.readLine(message);
        return handler(answer);
      });
    };
  }

  static getOrder = this.#createInputHandler(MESSAGES.getOrder, OrderHandler.format);

  static askMembership = this.#createInputHandler(MESSAGES.askMembership, AskHandler.getWhether);

  static askToContinue = this.#createInputHandler(MESSAGES.askToContinue, AskHandler.getWhether);

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
        return category;
    }
  };

  static #askAddItem = this.#createInputHandler(ORDER_MESSAGES.askAddItem, AskHandler.getWhether);

  static #askRemoveItems = this.#createInputHandler(
    ORDER_MESSAGES.askRemoveItems,
    AskHandler.getWhether,
  );
}

export default InputView;
