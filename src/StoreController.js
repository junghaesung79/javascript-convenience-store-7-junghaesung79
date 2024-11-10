import PurchaseService from './services/PurchaseService.js';
import { InputView, OutputView } from './view/index.js';
import Receipt from './models/Receipt.js';
import Shelves from './models/Shelves.js';
import FileSystem from './io/FileSystem.js';
import Printer from './io/Printer.js';

class StoreController {
  constructor() {
    this.shelves = new Shelves();
    this.batches = this.shelves.getBatches();
  }

  async run() {
    while (true) {
      await this.#useStore();

      const wantsToContinue = await InputView.askToContinue();
      if (wantsToContinue) continue;
      break;
    }
  }

  async #useStore() {
    this.#synchronizeFromFile();

    OutputView.printIntroduce();
    OutputView.printStocks(this.batches);

    const orders = await InputView.getOrder();
    const categorizedBundles = PurchaseService.purchase(orders);
    const bundles = await InputView.askPromotions(categorizedBundles);
    const promotionAppliedBundles = PurchaseService.applyPromotions(bundles);

    const hasMembership = await InputView.askMembership();
    const receipt = new Receipt(promotionAppliedBundles, hasMembership);
    OutputView.printReceipt(receipt);

    this.#synchronizeToFile();
  }

  #synchronizeFromFile() {
    const stocks = FileSystem.getStocks();
    Shelves.arrangeStocks(stocks);
    this.batches = this.shelves.getBatches();
  }

  #synchronizeToFile() {
    FileSystem.writeProducts(Shelves.denormalizeStocks());
  }
}

export default StoreController;
