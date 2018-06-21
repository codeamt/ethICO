var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC_PHRASE;
var infura_key = process.env.INFURA_KEY;

// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function() { return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_key);},
      network_id: 3,
      gas: 6721975,
      gasPrice: 20000000000
    }
  }
};

