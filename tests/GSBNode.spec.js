const GSBNode = require('../GSBNode');

describe('GSBNode', () => {
  it('should throw an error if no API key is provided', () => {
    expect(() => new GSBNode({})).toThrowError('[ERROR] You must provide an API key');
  });

  it('should construct the API URL correctly', () => {
    const apiKey = 'your-api-key';
    const gsbNode = new GSBNode({ apiKey });
    expect(gsbNode.URL).toBe(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`);
  });

  it('should throw an error if URLs are not provided as an array', async () => {
    const apiKey = 'your-api-key';
    const gsbNode = new GSBNode({ apiKey });

    await expect(gsbNode.lookup('https://example.com')).rejects.toThrowError('[ERROR] URLs must be an array');
  });

  it('should throw an error if URLs array is empty', async () => {
    const apiKey = 'your-api-key';
    const gsbNode = new GSBNode({ apiKey });

    await expect(gsbNode.lookup([])).rejects.toThrowError('[ERROR] URLs array must have at least 1 item');
  });

  it('should throw an error if URLs array exceeds the maximum limit', async () => {
    const apiKey = 'your-api-key';
    const gsbNode = new GSBNode({ apiKey });

    const urls = Array.from({ length: 501 }, (_, index) => `https://example-${index}.com`);

    await expect(gsbNode.lookup(urls)).rejects.toThrowError('[ERROR] URLs array must have a maximum of 500 items');
  });
});