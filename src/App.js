import StoreController from './StoreController.js';

class App {
  constructor() {
    this.controller = new StoreController();
  }

  async run() {
    await this.controller.run();
  }
}

export default App;
