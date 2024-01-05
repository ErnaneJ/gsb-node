/**
 * GSBNode - Google Safe Browsing NodeJS Wrapper
 *
 * A simplified wrapper for Google's Safe Browsing API v4 to check whether a URL is malicious or not.
 * See https://developers.google.com/safe-browsing/v4/ for more information.
 *
 * @class
 * @param {Object} options - Options for initializing the GSBNode instance.
 * @param {string} options.apiKey - Google Safe Browsing API key (required).
 * @param {string} [options.clientId='safe-browse-url-lookup'] - Client ID for API requests.
 * @param {string} [options.clientVersion='1.5.2'] - Client version for API requests.
 * @throws {Error} Throws an error if no API key is provided.
 */
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

  /**
   * Performs a lookup to Google Safe Browsing API to check if given URLs are malicious.
   *
   * @async
   * @param {string[]} urls - An array of URLs to be checked for malicious content.
   * @returns {Object[]} An array of threat matches. Each object contains information about the threat.
   * @throws {Error} Throws an error for invalid input or if the API request fails.
   */
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

    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify(body)
      });

      const data = await response.json();
      return data.matches || [];
    } catch (error) {
      throw new Error(`Error during API request: ${error.message}`);
    }
  }
}

module.exports = GSBNode;