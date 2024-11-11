import { Reader } from '../src/io/index.js';
import { InputView } from '../src/view/index.js';

jest.mock('../src/io/index.js', () => ({
  Reader: {
    readLine: jest.fn(),
  },
}));

describe('InputView - askPromotions', () => {
  test('추가 프로모션 제안시 Y 선택하면 add 카테고리 유지', async () => {
    // given
    Reader.readLine.mockResolvedValue('Y');
    const bundles = [
      {
        category: 'add',
        bundle: [{ name: '상품A', price: 1000 }],
      },
    ];

    // when
    const result = await InputView.askPromotions(bundles);

    // then
    expect(result[0].category).toBe('add');
  });

  test('추가 프로모션 제안시 N 선택하면 default 카테고리로 변경', async () => {
    // given
    Reader.readLine.mockResolvedValue('N');
    const bundles = [
      {
        category: 'add',
        bundle: [{ name: '상품A', price: 1000 }],
      },
    ];

    // when
    const result = await InputView.askPromotions(bundles);

    // then
    expect(result[0].category).toBe('default');
  });

  test('제거 프로모션 제안시 Y 선택하면 default 카테고리로 변경', async () => {
    // given
    Reader.readLine.mockResolvedValue('Y');
    const bundles = [
      {
        category: 'remove',
        bundle: [{ name: '상품A', price: 1000 }],
      },
    ];

    // when
    const result = await InputView.askPromotions(bundles);

    // then
    expect(result[0].category).toBe('default');
  });

  test('빈 배열 입력시 빈 배열 반환', async () => {
    // given
    const bundles = [];

    // when
    const result = await InputView.askPromotions(bundles);

    // then
    expect(result).toEqual([]);
  });
});
