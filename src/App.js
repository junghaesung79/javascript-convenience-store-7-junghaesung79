import FileSystem from './io/FileSystem.js';
import Promotion from './models/Promotion.js';
import Shelves from './models/Shelves.js';
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
