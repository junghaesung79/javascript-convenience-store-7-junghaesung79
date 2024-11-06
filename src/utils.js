import { Console } from '@woowacourse/mission-utils';

export const processFile = (file) => {
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
};

export const normalizeProducts = (ps) => {
  const indexToInsert = [];

  const newProducts = ps.map((p, index) => {
    p.price = Number(p.price);
    p.quantity = Number(p.quantity);
    if (p.promotion === 'null') {
      p.promotion = '';
    }

    if (p.promotion !== '' && ps[index + 1].name !== p.name) {
      indexToInsert.push(index);
    }

    return p;
  });

  indexToInsert.reverse().forEach((index) => {
    newProducts.splice(index + 1, 0, {
      name: ps[index].name,
      price: ps[index].price,
      quantity: 0,
      promotion: '',
    });
  });

  return newProducts;
};

export const formatOrder = (string) => {
  return string.split(',').map((phrase) => {
    const [name, quantity] = phrase.slice(1, -1).split('-');
    return {
      name,
      quantity: Number(quantity),
    };
  });
};

export const purchaseOrder = (orders, products) => {
  const basket = [];

  orders.forEach(({ name, quantity }) => {
    const productsToPurchase = products.filter((product) => {
      return name === product.name;
    });

    productsToPurchase[0].quantity -= quantity;
    const amount = productsToPurchase[0].price * quantity;

    basket.push({ name, quantity, amount });
  });

  return basket;
};
