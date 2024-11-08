import { formatOrder, normalizeProducts, processFile, purchaseOrder } from './utils.js';
import FileSystem from './io/FileSystem.js';
import { InputView, OutputView } from './view/index.js';

class StoreController {
  async run() {
    OutputView.printIntroduce();

    const stocks = FileSystem.getStocks();
    const arrangedStocks = arrangeStocks(stocks);

    const orders = formatOrder(orderString);
    const basket = purchaseOrder(orders, products);

    OutputView.printReceipt(basket);

    // isMembershiped();
  }
}

export default StoreController;
