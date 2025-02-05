describe('defaults', () => {
  test('initial values', () => {
    const defaults = require('./defaults').default;
    expect(defaults).toEqual({
      isOpenDrawer: true,
      drawerWidth: 480,
      queryHistory: [],
      connections: [],
      form: {
        url: '',
        u: '',
        p: '',
        db: '',
        q: '',
        __typename: 'FormData',
      },
      server: null,
      resultsTable: {
        order: 'asc',
        orderKey: '',
        page: 0,
        rowsPerPage: 10,
        timeFormat: 'timestamp',
        __typename: 'ResultsTable',
      },
    });
  });

  test('queryHistory filtering and providing default values', () => {
    jest.resetModules();
    jest.doMock('../helpers/storage', () => ({
      get: () =>
        '[{},{"query":""},{"something":"test"},{"query":"select","other":"test"}]',
    }));
    const defaults = require('./defaults').default;
    expect(defaults.queryHistory).toEqual([
      { other: 'test', query: 'select', error: '' },
    ]);
  });

  test('connections default values', () => {
    jest.resetModules();
    jest.doMock('../helpers/storage', () => ({
      get: () => '[{"url":"http://test.test"}, {"u":"username","p":"pass"}]',
    }));
    const defaults = require('./defaults').default;
    expect(defaults.connections).toEqual([
      { url: 'http://test.test', u: '', p: '', db: '' },
      { url: '', u: 'username', p: 'pass', db: '' },
    ]);
  });
});
