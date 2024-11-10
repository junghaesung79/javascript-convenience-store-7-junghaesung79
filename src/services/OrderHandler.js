import { throwError } from '../utils/validate';

class OrderHandler {
  static #rules = {
    isEmpty(orders) {
      return orders.length === 0;
    },
    hasEmptyOrder(value) {
      return !value;
    },
  };

  static format(string) {
    const orders = OrderHandler.#separateOrderString(string);
    OrderHandler.#validateOrders(orders);

    const parsedOrders = OrderHandler.#parseOrders(orders);
    OrderHandler.#validateOrders(parsedOrders);

    const combinedOrders = OrderHandler.#combineSameOrders(parsedOrders);
    OrderHandler.#checkOrdersQuantity(combinedOrders);

    return combinedOrders;
  }

  static #separateOrderString(string) {
    return string.split(',');
  }

  static #validateOrders(orders) {
    if (this.#rules.isEmpty(orders)) throwError(ERROR_MESSAGES.orders.isEmpty);

    orders.some((order) => {
      if (this.#rules.hasEmptyOrder(order)) throwError(ERROR_MESSAGES.orders.hasEmptyOrder);
    });
  }

  static #parseOrders(orders) {
    return orders.map((phrase) => {
      const [name, quantity] = phrase.slice(1, -1).split('-');
      return {
        name,
        quantity: Number(quantity),
      };
    });
  }

  static #validateEachOrder(orders) {
    //
  }

  static #combineSameOrders(orders) {
    //
  }

  static #checkOrdersQuantity(orders) {
    //
  }
}

export default OrderHandler;
