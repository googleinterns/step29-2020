import { SessionCache } from './sessioncache';

test('We can check if updateController() is called +' +
    'correct return value', () => {
        const cache = new SessionCache();
        const spy = jest.spyOn(cache, 'updateController');

        expect(cache.updateController()).toBe(undefined);
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      }
);

test('We can check if getValue() is called +' +
    'correct return value', () => {
      const cache = new SessionCache();
      const spy = jest.spyOn(cache, 'getValue');

      expect(cache.getValue('hello')).toBe('hello');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    }
);
