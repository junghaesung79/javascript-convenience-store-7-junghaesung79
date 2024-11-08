import fs from 'fs';
import { PRODUCTS_ROUTE, PROMOTIONS_ROUTE } from '../cosntants/route';

class FileSystem {
  static getStocks() {
    const file = fs.readFileSync(PRODUCTS_ROUTE, 'utf8');
    return FileSystem.#processFile(file);
  }

  static getPromotionInformation() {
    const file = fs.readFileSync(PROMOTIONS_ROUTE, 'utf8');
    return FileSystem.#processFile(file);
  }

  static writeProducts = (productsFile) => {
    fs.writeFileSync(PRODUCTS_ROUTE, productsFile);
  };

  static #processFile(file) {
    const splittedFile = file.split('\n');
    const header = splittedFile[0].split(',');
    const body = splittedFile.slice(1, -1);

    const template = header.reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {});

    return body.map((rawProduct) =>
      Object.keys(template).reduce((obj, key, index) => {
        obj[key] = rawProduct.split(',')[index];
        return obj;
      }, {}),
    );
  }
}

export default FileSystem;
