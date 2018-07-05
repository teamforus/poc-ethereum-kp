module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      //from: "0xb8918494b24862b2b9dc7cc2c3e9a41893d8d4b6", // Private key import
      from: "0x3837a575eA779373777F682B26CbB32d3A00d8cB", // jastam/geth account
      network_id: "development",
      chainId: 3177,
      gas: 3190000,
      gasPrice: 0
    }
  }
};
