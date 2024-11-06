import fs from 'fs';
import { PRODUCTS_ROUTE, PROMOTIONS_ROUTE } from '../cosntants/route';

export const readProductsFile = () => fs.readFileSync(PRODUCTS_ROUTE, 'utf8');
export const readPromotionsFile = () => fs.readFileSync(PROMOTIONS_ROUTE, 'utf8');

export const writeProducts = (productsFile) => {
  fs.writeFileSync(PRODUCTS_ROUTE, productsFile);
};
