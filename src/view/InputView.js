import { MESSAGES, orderMessages } from '../cosntants/messages.js';
import Reader from '../io/Reader.js';
import AskHandler from '../services/AskHandler.js';
import OrderHandler from '../services/OrderHandler.js';
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
        return (await this.#askRemoveItems()) ? 'remove' : 'default';
      default:
        return category;
    }
  };

  static #askAddItem = this.#createInputHandler(orderMessages.askAddItem, AskHandler.getWhether);

  static #askRemoveItems = this.#createInputHandler(
    orderMessages.askRemoveItems,
    AskHandler.getWhether,
  );
}

export default InputView;
