require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
const fs = require("fs");

const defaultNetwork = "mumbai";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "mumbai") {
    }
  }
  return "";
}

module.exports = {
  defaultNetwork,

  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://localhost:8545",
    },
    //skale: {
    //  url: "https://eth-global-10.skalenodes.com:10200",
    //  accounts: [`0x${process.env.PRIVATE_KEY}`]
    //},
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    //ropsten: {
    //  url: "https://ropsten.infura.io/v3/b98747734bab473a99d0fe366eb065a0",
    //  accounts: [`0x${process.env.PRIVATE_KEY}`]
    //  //accounts: {
    //  //  mnemonic: mnemonic(),
    //  //},
    //},

    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/6842d8c76d0943b2b5f9a4a269b62484",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
      //accounts: {
      //  mnemonic: mnemonic(),
      //},
    },
    
      //polygon: {
      //  url: "https://ropsten.infura.io/v3/b98747734bab473a99d0fe366eb065a0",
      //  accounts: [`0x${process.env.PRIVATE_KEY}`]
      //accounts: {
      //  mnemonic: mnemonic(),
      //},
      //},

    kovan: {
      url: "https://kovan.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://dai.poa.network',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.0"
      },
      {
        version: "0.5.8"
      },
      {
        version: "0.6.12"
      },
      {
        version: "0.7.0"
      }],
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
      // add other network's API key here
  },

  abiExporter: {
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: './frontend/src/contracts'

  },
  mocha: {
    timeout: 10000000
  }

};