import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const mockNowDate = (date = null) => {
  const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, 'now');
  mockDateTimes.mockReturnValue(new Date(date));
  return mockDateTimes;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach((exp) => {
    expect(received).toContain(exp);
  });
};

const expectLogContainsWithoutSpacesAndEquals = (received, expects) => {
  const processedReceived = received.replace(/[\s=]/g, '');
  expects.forEach((exp) => {
    expect(processedReceived).toContain(exp);
  });
};

const runExceptions = async ({
  inputs = [],
  inputsToTerminate = [],
  expectedErrorMessage = '',
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedErrorMessage));
};

const run = async ({
  inputs = [],
  inputsToTerminate = [],
  expected = [],
  expectedIgnoringWhiteSpaces = [],
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  const output = getOutput(logSpy);

  // then
  if (expectedIgnoringWhiteSpaces.length > 0) {
    expectLogContainsWithoutSpacesAndEquals(output, expectedIgnoringWhiteSpaces);
  }
  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

const INPUTS_TO_TERMINATE = ['[비타민워터-1]', 'N', 'N'];

describe('편의점', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    MissionUtils.Console.readLineAsync.messages = [];
  });

  // test('파일에 있는 상품 목록 출력', async () => {
  //   await run({
  //     inputs: ['[콜라-1]', 'N', 'N'],
  //     expected: [
  //       /* prettier-ignore */
  //       '- 콜라 1,000원 10개 탄산2+1',
  //       '- 콜라 1,000원 10개',
  //       '- 사이다 1,000원 8개 탄산2+1',
  //       '- 사이다 1,000원 7개',
  //       '- 오렌지주스 1,800원 9개 MD추천상품',
  //       '- 오렌지주스 1,800원 재고 없음',
  //       '- 탄산수 1,200원 5개 탄산2+1',
  //       '- 탄산수 1,200원 재고 없음',
  //       '- 물 500원 10개',
  //       '- 비타민워터 1,500원 6개',
  //       '- 감자칩 1,500원 5개 반짝할인',
  //       '- 감자칩 1,500원 5개',
  //       '- 초코바 1,200원 5개 MD추천상품',
  //       '- 초코바 1,200원 5개',
  //       '- 에너지바 2,000원 5개',
  //       '- 정식도시락 6,400원 8개',
  //       '- 컵라면 1,700원 1개 MD추천상품',
  //       '- 컵라면 1,700원 10개',
  //     ],
  //   });
  // });

  // test('프로모션 없는 한 종류의 일반 상품 구매', async () => {
  //   await run({
  //     inputs: ['[물-2]', 'N', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈1,000'],
  //   });
  // });

  // test('프로모션 없는 여러 종류의 일반 상품 구매', async () => {
  //   await run({
  //     inputs: ['[비타민워터-3],[물-2],[정식도시락-2]', 'N', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈18,300'],
  //   });
  // });

  // test('재고 수량을 초과하여 주문', async () => {
  //   await runExceptions({
  //     inputs: ['[컵라면-12]'],
  //     inputsToTerminate: INPUTS_TO_TERMINATE,
  //     expectedErrorMessage: '[ERROR]',
  //   });
  // });

  // test('빈 입력값 처리', async () => {
  //   await runExceptions({
  //     inputs: [''],
  //     inputsToTerminate: INPUTS_TO_TERMINATE,
  //     expectedErrorMessage: '[ERROR]',
  //   });
  // });

  // test('잘못된 형식의 입력값 처리', async () => {
  //   await runExceptions({
  //     inputs: ['콜라-1'],
  //     inputsToTerminate: INPUTS_TO_TERMINATE,
  //     expectedErrorMessage: '[ERROR]',
  //   });
  // });

  test('프로모션 적용 가능한 상품 구매 (멤버십 미적용)', async () => {
    mockNowDate('2024-01-01'); // 프로모션 유효 기간
    await run({
      inputs: ['[콜라-3]', 'N', 'N'],
      expectedIgnoringWhiteSpaces: ['내실돈2,000'], // 2+1 적용
    });
  });

  // test('프로모션 없는 상품 구매 (멤버십 적용)', async () => {
  //   await run({
  //     inputs: ['[물-2]', 'Y', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈700'], // 1000 - 30% 할인
  //   });
  // });

  // test('프로모션 적용 가능한 상품 구매 (멤버십 적용)', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-3]', 'Y', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈2,000'], // 프로모션 상품은 멤버십 할인 제외
  //   });
  // });

  // test('프로모션 + 잉여 상품 구매 (멤버십 적용)', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-4]', 'Y', 'Y', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈2,700'], // 3개는 2+1, 1개는 멤버십 할인
  //   });
  // });

  // test('동일 프로모션 여러 번 적용', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-6]', 'N', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈4,000'], // 2+1 두 번 적용
  //   });
  // });

  // test('프로모션 상품 추가 선택', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-2]', 'Y', 'N', 'N'], // 추가 선택 'Y'
  //     expectedIgnoringWhiteSpaces: ['내실돈2,000'], // 2+1 적용
  //   });
  // });

  // test('프로모션 상품 제외 선택', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-4]', 'Y', 'N', 'N'], // 제외 선택 'Y'
  //     expectedIgnoringWhiteSpaces: ['내실돈3,000'], // 3개만 2+1 적용
  //   });
  // });

  // test('두 종류 상품 구매 (프로모션 없음)', async () => {
  //   await run({
  //     inputs: ['[물-2],[에너지바-1]', 'N', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈3,000'],
  //   });
  // });

  // test('두 종류 상품 구매 (프로모션 적용)', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-3],[사이다-3]', 'N', 'N'],
  //     expectedIgnoringWhiteSpaces: ['내실돈4,000'], // 각각 2+1 적용
  //   });
  // });

  // test('두 종류 상품 프로모션 추가/제외 선택', async () => {
  //   mockNowDate('2024-01-01');
  //   await run({
  //     inputs: ['[콜라-2],[사이다-4]', 'Y', 'Y', 'N', 'N'], // 콜라 추가, 사이다 제외
  //     expectedIgnoringWhiteSpaces: ['내실돈5,000'],
  //   });
  // });
});
