import * as ERROR_MESSAGES from '../cosntants/errorMessages.js';
import { throwError } from '../utils/errorHandler.js';
import { isInvalidNumber } from '../utils/validationRules.js';

class OrderHandler {
  static #rules = {
    isEmpty: (orders) => orders.length === 0,
    hasEmptyOrder: (string) => !string,
    hasInvalidFormat: (string) => {
      return !(string.startsWith('[') && string.endsWith(']') && string.split('-').length === 2);
    },
  };

  static format(string) {
    const orderTokens = OrderHandler.#separateOrderString(string);
    OrderHandler.#validateOrderFormat(orderTokens);

    const parsedOrders = OrderHandler.#parseOrders(orderTokens);
    OrderHandler.#validateOrderValues(parsedOrders);

    const combinedOrders = OrderHandler.#combineSameOrders(parsedOrders);
    OrderHandler.#validateAvailability(combinedOrders);

    return combinedOrders;
  }

  static #separateOrderString(string) {
    return string.split(',');
  }

  static #validateOrderFormat(orderTokens) {
    if (this.#rules.isEmpty(orderTokens)) throwError(ERROR_MESSAGES.orders.isEmpty);

    orderTokens.forEach((order) => {
      if (this.#rules.hasEmptyOrder(order)) throwError(ERROR_MESSAGES.orders.hasEmptyOrder);
      if (this.#rules.hasInvalidFormat(order)) throwError(ERROR_MESSAGES.orders.invalidFormat);
    });
  }

  static #parseOrders(orderTokens) {
    return orderTokens.map((token) => {
      const [name, quantity] = token.slice(1, -1).split('-');
      return { name, quantity: Number(quantity) };
    });
  }

  static #validateOrderValues(orders) {
    orders.forEach((order) => {
      if (isInvalidNumber(order.quantity)) {
        throwError(ERROR_MESSAGES.orders.invalidNumber);
      }
    });
  }

  static #combineSameOrders(orders) {
    return Object.values(
      orders.reduce((acc, order) => {
        if (!acc[order.name]) {
          acc[order.name] = { ...order };
          return acc;
        }

        acc[order.name].quantity += order.quantity;
        return acc;
      }, {}),
    );
  }

  static #validateAvailability(orders) {
    // 정확한 상품명
  }
}

export default OrderHandler;
