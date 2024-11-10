import { isMembershiped } from './functions.js';
import PurchaseService from './services/PurchaseService.js';
import { InputView, OutputView } from './view/index.js';
import Receipt from './models/Receipt.js';
import Shelves from './models/Shelves.js';
import FileSystem from './io/FileSystem.js';

class StoreController {
  constructor() {
    this.shelves = new Shelves();
    this.batches = this.shelves.getBatches();
  }

  async run() {
    this.#synchronizeFromFile();

    OutputView.printIntroduce();
    OutputView.printStocks(this.batches);

    const orders = await InputView.getOrder();
    const bundles = PurchaseService.purchase(orders);

    const answer = await InputView.askMembership();
    const receipt = new Receipt(bundles, isMembershiped(answer));
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
