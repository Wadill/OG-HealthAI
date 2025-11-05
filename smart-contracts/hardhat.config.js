require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    og_testnet: {
      url: "https://evmrpc-testnet.0g.ai",
      chainId: 16600,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      og_testnet: "abc", // placeholder
    },
    customChains: [
      {
        network: "og_testnet",
        chainId: 16600,
        urls: {
          apiURL: "https://explorer.0g.ai/api",
          browserURL: "https://explorer.0g.ai",
        },
      },
    ],
  },
};