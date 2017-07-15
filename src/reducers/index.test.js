import reducers from './index';

describe('reducers/index', () => {

  it('exports a working reducer as default', () => {
    const state = {
      some: 'values',
      the: {
        state: true
      }
    };

    const result = reducers(state, { type: 'AN_UNKNOWN_ACTION' });

    expect(result).toEqual(state);
  });

});
