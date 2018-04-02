# Ledger Wallet Provider for Truffle

The Truffle Ledger Wallet Provider lets you deploy your contracts with your ledger wallet.


## Installation
```
    npm install truffle-ledger-wallet-provider
```


## Usage

Browser support must be disabled and contract data enabled on your ledger device.
It can be used like
```
const providerFactory = require("truffle-ledger-wallet-provider").default;
const provider = providerFactory("https://ropsten.infura.io/", 3, "44'/60'/0'/0");
```

Parameters:
- `providerUri`: `string`. URI of Ethereum client to send all other non-transaction-related Web3 requests.
- `networkId`: `number`. Network id of Ethereum network.
- `derivationPath`: `string`. Account derivation path. 

## Example Truffle config
truffle.js
```javascript
const providerFactory = require("truffle-ledger-wallet-provider").default;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function () {
          return providerFactory("https://ropsten.infura.io/", 3, "44'/60'/0'/0");
      },
      network_id: 3
    }
  }
};
```