import { Poll } from './poll';

test('We can check if poll() is called + correct return value', () => {
  const poll = new Poll();
  const spy = jest.spyOn(poll, 'poll');

  expect(poll.poll()).toBe(undefined);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});

test('We can check if getResult() is called + correct' +
    'return value', () => {
      const poll = new Poll();
      const spy = jest.spyOn(poll, 'getResult');

      expect(poll.getResult()).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    }
);
