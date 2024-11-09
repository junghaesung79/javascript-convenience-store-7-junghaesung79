import { Console } from '@woowacourse/mission-utils';
import { formatOrder, arrangeStocks, addToCart, getProducts, isMembershiped } from './functions.js';
import FileSystem from './io/FileSystem.js';
import Promotion from './models/Promotion.js';
import PurchaseService from './services/PurchaseService.js';
import { InputView, OutputView } from './view/index.js';
import Receipt from './models/Receipt.js';

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
    const purchasedBundles = PurchaseService.purchaseCartBundles(cart, products);
    const answer = await InputView.askMembership();
    const receipt = new Receipt(purchasedBundles, isMembershiped(answer));
    OutputView.printReceipt(receipt);
  }
}

export default StoreController;
