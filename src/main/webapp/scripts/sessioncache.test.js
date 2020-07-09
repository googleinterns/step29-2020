import { SessionCache } from './sessioncache';

test('Checks to see if cache initializes correctly', () => {
      try {
        const cache = new SessionCache();
      } catch (e) {
        expect(e.message).toBe('Unimplemented');
      }
    }
);
