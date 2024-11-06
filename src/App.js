import fs from 'fs';
import { Console } from '@woowacourse/mission-utils';
import { getOrder, normalizeProducts, printStocks, processFile, purchaseOrder } from './utils.js';
import { printReceipt } from './print.js';

const 상품 = 'public/products.md';
const 행사 = 'public/promotions.md';

const writeProducts = (productsFile) => {
  fs.writeFileSync(상품, productsFile);
};

class App {
  async run() {
    Console.print('안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.');
    Console.print('');
    const rawStocks = fs.readFileSync(상품, 'utf8');
    const rawPromotions = fs.readFileSync(행사, 'utf8');
    const stocks = processFile(rawStocks);
    const products = normalizeProducts(stocks);

    printStocks(products);
    const orderString = await Console.readLineAsync('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
    Console.print('');

    const orders = getOrder(orderString);
    const basket = purchaseOrder(orders, products);

    printReceipt(basket);
  }
}

export default App;
