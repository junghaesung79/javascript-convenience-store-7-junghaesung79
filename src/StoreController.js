import { getOrder, normalizeProducts, printStocks, processFile, purchaseOrder } from './utils.js';
import { readProductsFile } from './utils/fileSystem.js';
import { printReceipt } from './print.js';
import Printer from './io/Printer.js';
import Reader from './io/Reader.js';

class StoreController {
  async run() {
    Printer.print('안녕하세요. W편의점입니다.');
    Printer.print('현재 보유하고 있는 상품입니다.');
    Printer.printNewline();
    const rawStocks = readProductsFile();
    const stocks = processFile(rawStocks);
    const products = normalizeProducts(stocks);

    printStocks(products);
    const orderString = Reader.readLine('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
    Printer.printNewline();

    const orders = getOrder(orderString);
    const basket = purchaseOrder(orders, products);

    printReceipt(basket);
    // isMembershiped();
  }
}

export default StoreController;
