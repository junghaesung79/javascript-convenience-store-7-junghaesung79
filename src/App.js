import { FileSystem } from './io/index.js';
import { Promotion, Shelves } from './models/index.js';
import StoreController from './StoreController.js';

class App {
  constructor() {
    Promotion.updatePromotions(FileSystem.getPromotions());
    Shelves.arrangeStocks(FileSystem.getStocks());
    this.controller = new StoreController();
  }

  async run() {
    await this.controller.run();
  }
}

export default App;
