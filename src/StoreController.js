import { formatOrder, normalizeProducts, processFile, purchaseOrder } from './utils.js';
import { readProductsFile } from './utils/fileSystem.js';
import { InputView, OutputView } from './view/index.js';

class StoreController {
  async run() {
    OutputView.printIntroduce();
    const rawStocks = readProductsFile();
    const stocks = processFile(rawStocks);
    const products = normalizeProducts(stocks);

    OutputView.printStocks(products);
    const orderString = await InputView.getOrder();

    const orders = formatOrder(orderString);
    const basket = purchaseOrder(orders, products);

    OutputView.printReceipt(basket);

    // isMembershiped();
  }
}

export default StoreController;
