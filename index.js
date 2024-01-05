class GSBNode {
  constructor(options) {
    this.apiKey = options.apiKey;

    if (!this.apiKey) throw new Error('[ERROR] You must provide an API key');

    this.URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${this.apiKey}`;
    this.options = {
      clientId: 'safe-browse-url-lookup',
      clientVersion: '1.5.2',
      ...options
    };
  }

  async lookup(urls) {
    if (!Array.isArray(urls)) throw new Error('[ERROR] URLs must be an array');
    if (urls.length < 1) throw new Error('[ERROR] URLs array must have at least 1 item');
    if (urls.length > 500) throw new Error('[ERROR] URLs array must have a maximum of 500 items');

    const body = {
      client: {
        clientId: this.options.clientId,
        clientVersion: this.options.clientVersion
      },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: urls.map(url => ({ url }))
      }
    };

    const response = await fetch(this.URL, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return data.matches || [];
  }
}

module.exports = GSBNode;