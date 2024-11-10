import fs from 'fs';
import { PRODUCTS_ROUTE, PROMOTIONS_ROUTE } from '../cosntants/route.js';

class FileSystem {
  static getStocks() {
    const file = fs.readFileSync(PRODUCTS_ROUTE, 'utf8');
    return FileSystem.#processFile(file);
  }

  static getPromotions() {
    const file = fs.readFileSync(PROMOTIONS_ROUTE, 'utf8');
    return FileSystem.#processFile(file);
  }

  static writeProducts(rawStocks) {
    const productsFile = this.#convertToCSV(rawStocks);
    fs.writeFileSync(PRODUCTS_ROUTE, productsFile);
  }

  static #processFile(file) {
    const splittedFile = file.split('\n');
    const header = splittedFile[0].split(',');
    const body = splittedFile.slice(1, -1);

    const template = header.reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {});

    return body.map((stockToken) =>
      Object.keys(template).reduce((obj, key, index) => {
        obj[key] = stockToken.split(',')[index];
        return obj;
      }, {}),
    );
  }

  static #convertToCSV(objects) {
    if (!objects || objects.length === 0) {
      throw new Error('데이터가 없습니다.');
    }

    const headers = Object.keys(objects[0]);
    const headerRow = headers.join(',');
    const dataRows = objects.map((obj) => headers.map((header) => obj[header]).join(','));

    return [headerRow, ...dataRows, ''].join('\n');
  }
}

export default FileSystem;
