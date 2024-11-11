import * as ERROR_MESSAGES from '../constants/errorMessages.js';
import Shelves from '../models/Shelves.js';
import { sameNameWith, sumOfProperty } from '../utils/common.js';
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
    if (this.#rules.isEmpty(orderTokens)) throwError(ERROR_MESSAGES.invalidFormat);

    orderTokens.forEach((order) => {
      if (this.#rules.hasEmptyOrder(order)) throwError(ERROR_MESSAGES.invalidFormat);
      if (this.#rules.hasInvalidFormat(order)) throwError(ERROR_MESSAGES.invalidFormat);
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
        throwError(ERROR_MESSAGES.invalidFormat);
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
    const shelves = new Shelves();
    const batches = shelves.getBatches();

    orders.forEach((order) => {
      this.#validateProductExists(order, batches);
      this.#validateStockQuantity(order, batches);
    });
  }

  static #validateProductExists(order, batches) {
    const exists = batches.some(sameNameWith(order.name));
    if (!exists) throwError(ERROR_MESSAGES.invalidProductName);
  }

  static #validateStockQuantity(order, batches) {
    const totalStock = batches
      .filter(sameNameWith(order.name))
      .reduce(sumOfProperty('quantity'), 0);

    if (order.quantity > totalStock) throwError(ERROR_MESSAGES.exceedsStock);
  }
}

export default OrderHandler;
