import { Console } from '@woowacourse/mission-utils';
import { Reader } from '../src/io/index.js';
import { CONFIG, ERROR_MESSAGES } from '../src/constants/index.js';

const mockQuestions = (inputs) => {
  const messages = [];

  Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  Console.readLineAsync.messages = messages;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('Reader 클래스 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('정상적인 입력 처리', async () => {
    // given
    const query = '입력하세요: ';
    const expectedInput = 'test input';
    mockQuestions([expectedInput]);

    // when
    const result = await Reader.readLine(query);

    // then
    expect(result).toBe(expectedInput);
    expect(Console.readLineAsync).toHaveBeenCalledWith(query);
  });

  test('빈 입력 시 에러 발생 및 재시도', async () => {
    // given
    const query = '입력하세요: ';
    const validInput = 'valid input';
    mockQuestions(['', validInput]);
    const logSpy = getLogSpy();

    // when
    const result = await Reader.readLine(query);

    // then
    expect(logSpy).toHaveBeenCalledWith(`${CONFIG.errorPrefix} ${ERROR_MESSAGES.others}`);
    expect(result).toBe(validInput);
  });

  test('공백 문자만 있는 입력 시 에러 발생', async () => {
    // given
    const query = '입력하세요: ';
    const validInput = 'valid input';
    mockQuestions(['   ', validInput]);
    const logSpy = getLogSpy();

    // when
    const result = await Reader.readLine(query);

    // then
    expect(logSpy).toHaveBeenCalledWith(`${CONFIG.errorPrefix} ${ERROR_MESSAGES.others}`);
    expect(result).toBe(validInput);
  });

  test('여러 번의 잘못된 입력 후 정상 입력', async () => {
    // given
    const query = '입력하세요: ';
    const validInput = 'valid input';
    mockQuestions(['', '  ', '', validInput]);
    const logSpy = getLogSpy();

    // when
    const result = await Reader.readLine(query);

    // then
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(result).toBe(validInput);
  });
});
