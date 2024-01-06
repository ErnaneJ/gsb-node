# 🌐 Google Safe Browsing NodeJS Wrapper

The Google Safe Browsing NodeJS Wrapper is a concise and efficient tool for interacting with Google's Safe Browsing API v4 using Node.js. This wrapper simplifies the process of checking whether a given URL is associated with malicious content.

<p align="center">
  <a href="https://github.com/ErnaneJ/gsb-node/actions/workflows/e2e.yml">
    <img src="https://github.com/ErnaneJ/gsb-node/actions/workflows/e2e.yml/badge.svg?branch=main" alt="E2E"/>
  </a>
  <a href="(https://www.npmjs.com/package/gsb-node">
    <img src="https://img.shields.io/badge/NPM-gsb--node-BC3433" alt="GSB-NODE"/>
  </a>
<p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ErnaneJ/gsb-node/main/assets/google_safe_browsing_banner.png"/>
</p>

## 🛠️ Usage

### ⬇️ Installation

Install the package via npm:

```bash
npm install gsb-node
```

### 📍 Initialization

```javascript
const GSBNode = require('gsb-node');

// Initialize with your Google Safe Browsing API key
const gsb = new GSBNode({ apiKey: 'your-api-key' });
```

### 📃 API Documentation

For comprehensive information on the Google Safe Browsing API v4, refer to the [official documentation](https://developers.google.com/safe-browsing/v4/).

## ℹ️ Example

```javascript
const gsb = new GSBNode({ apiKey: 'your-api-key' });

const maliciousURLs = await gsb.lookup(['https://example.com/malicious']);
console.log('Malicious URLs:', maliciousURLs);
```

_or check this testing example [here](https://github.com/ErnaneJ/gsb-node/blob/main/examples/example.js)._

## 🔐 API Key Setup

To create a Google Safe Browsing API key, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the "Safe Browsing API" for your project.
4. Create credentials and generate an API key.

For more details, refer to the [official guide](https://developers.google.com/safe-browsing/v4/get-started).

## 🫂 Contributing

Feel free to contribute to this project by submitting issues or pull requests on the [GitHub repository](https://github.com/ErnaneJ/gsb-node).

This wrapper aims to provide a seamless integration with the Google Safe Browsing API v4, making it easier for Node.js developers to enhance the security of their applications.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ErnaneJ/gsb-node/blob/700be5f25afd922d1a35cb36f74ed916b75e2cf4/LICENSE) file for details.
