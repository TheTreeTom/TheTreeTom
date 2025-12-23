/* eslint-env jest */
const {topPages} = require('../src/connectors/wordpress');

describe('wordpress connector', () => {
  const oldEnv = process.env;
  beforeEach(()=>{
    process.env = {...oldEnv};
    global.fetch = jest.fn();
  });
  afterEach(()=>{
    process.env = oldEnv;
    delete global.fetch;
  });

  it('throws when WP_API_URL is not set', async () => {
    delete process.env.WP_API_URL;
    await expect(topPages()).rejects.toThrow('WP_API_URL not set');
  });

  it('parses posts from WP REST API', async () => {
    process.env.WP_API_URL = 'https://example.com';
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ([{title:{rendered:'Post 1'}, link:'https://example.com/1', excerpt:{rendered:'<p>Summary</p>'}}])
    });

    const pages = await topPages({perPage:1});
    expect(pages.length).toBe(1);
    expect(pages[0].title).toBe('Post 1');
    expect(pages[0].url).toBe('https://example.com/1');
    expect(pages[0].summary).toBe('Summary');
  });
});