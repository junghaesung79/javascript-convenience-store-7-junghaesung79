import { Console } from '@woowacourse/mission-utils';
import Reader from '../src/io/Reader';

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
  test('readLine 기능 테스트', async () => {
    // given
    mockQuestions(['abc']);

    // when
    const line = await Reader.readLine('');

    // then
    expect(line).toBe('abc');
  });

  test('빈 입력 예외 테스트', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['', 'abc']);

    // when
    const line = await Reader.readLine('');

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });
});
