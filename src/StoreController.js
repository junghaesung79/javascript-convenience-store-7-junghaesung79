import { Console } from '@woowacourse/mission-utils';
import { formatOrder, arrangeStocks, addToCart, getProducts } from './functions.js';
import FileSystem from './io/FileSystem.js';
import Promotion from './models/Promotion.js';
import PurchaseService from './services/PurchaseService.js';
import { InputView, OutputView } from './view/index.js';

class StoreController {
  constructor() {
    Promotion.updatePromotions(FileSystem.getPromotions());
  }

  async run() {
    OutputView.printIntroduce();

    const stocks = FileSystem.getStocks();
    const arrangedStocks = arrangeStocks(stocks);
    OutputView.printStocks(arrangedStocks);

    const products = getProducts(arrangedStocks);
    const orderString = await InputView.getOrder();
    const orders = formatOrder(orderString);
    const cart = addToCart(orders, products);
    const receipt = PurchaseService.purchaseCartItems(cart, products);
    OutputView.printReceipt(receipt);

    // const answer = await Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
    // isMembershiped();
  }
}

export default StoreController;
