class OrderHandler {
  static format(string) {
    OrderHandler.#validateOrderString(string);

    const orders = OrderHandler.#processOrderString(string);
    OrderHandler.#validateOrders(orders);

    const combinedOrders = OrderHandler.#combineSameOrders(orders);
    OrderHandler.#checkOrdersQuantity(combinedOrders);

    return combinedOrders;
  }

  static #processOrderString(string) {
    //
    return string.split(',').map((phrase) => {
      const [name, quantity] = phrase.slice(1, -1).split('-');
      return {
        name,
        quantity: Number(quantity),
      };
    });
  }

  static #combineSameOrders(orders) {
    //
  }

  static #validateOrderString(string) {
    //
  }

  static #validateOrders(orders) {
    //
  }

  static #checkOrdersQuantity(orders) {
    //
  }
}

export default OrderHandler;
