import { addToCart, isMembershiped } from './functions.js';
import PurchaseService from './services/PurchaseService.js';
import { InputView, OutputView } from './view/index.js';
import Receipt from './models/Receipt.js';
import Shelves from './models/Shelves.js';

class StoreController {
  #shelves;

  constructor() {
    this.#shelves = new Shelves();
  }

  async run() {
    const bundles = this.#shelves.getBundles();

    OutputView.printIntroduce();
    OutputView.printStocks(bundles);

    const orders = await InputView.getOrder();
    const cart = addToCart(orders, bundles);
    const purchasedBundles = PurchaseService.purchaseCartBundles(cart);

    const answer = await InputView.askMembership();
    const receipt = new Receipt(purchasedBundles, isMembershiped(answer));
    OutputView.printReceipt(receipt);
  }
}

export default StoreController;
