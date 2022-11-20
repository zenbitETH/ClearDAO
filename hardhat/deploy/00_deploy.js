require("hardhat-deploy");
require("hardhat-deploy-ethers");

const { ethers } = require("hardhat");
const fa = require("@glif/filecoin-address");
const util = require("util");
const request = util.promisify(require("request"));

const DEPLOYER_PRIVATE_KEY = network.config.accounts[0];

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return new Uint8Array(bytes);
}

async function callRpc(method, params) {
  var options = {
    method: "POST",
    url: "https://wallaby.node.glif.io/rpc/v0",
    // url: "http://localhost:1234/rpc/v0",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    }),
  };
  const res = await request(options);
  return JSON.parse(res.body).result;
}

const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);

module.exports = async ({ deployments }) => {
  const { deploy } = deployments;


  const priorityFee = await callRpc("eth_maxPriorityFeePerGas");
  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();
  const nonce = await callRpc("Filecoin.MpoolGetNonce", [f4Address]);

  console.log("Wallet Ethereum Address:", deployer.address);
  console.log("Wallet f4Address: ", f4Address)



async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
  
    // const Timelock = await ethers.getContractFactory('Timelock');
    // const timelock = await Timelock.deploy(deployer.address, 259200);
    // await timelock.deployed();
    // console.log('Timelock address: ', timelock.address);
    // setAddressInCompiledContracts(timelock, 'Timelock');
  
    // const SafeMath = await ethers.getContractFactory('SafeMath');
    // const safeMath = await SafeMath.deploy();
    // await safeMath.deployed();
    // console.log('SafeMath address: ', safeMath.address);
    // setAddressInCompiledContracts(safeMath, 'SafeMath');
  
    const Voto = await ethers.getContractFactory('Voto');
    let voto = await Voto.deploy(deployer.address);
    await voto.deployed();
    console.log('Voto address: ', voto.address);
    setAddressInCompiledContracts(voto, 'Voto');
  
    const GovernorAlpha = await ethers.getContractFactory('contracts/GovernorAlpha.sol:GovernorAlpha');
    // let governorAlpha = await GovernorAlpha.deploy(timelock.address, voto.address, deployer.address);
    let governorAlpha = await GovernorAlpha.deploy(voto.address);
    await governorAlpha.deployed();
    console.log('GovernorAlpha address: ', governorAlpha.address);
    setAddressInCompiledContracts(governorAlpha, 'GovernorAlpha');
  
    //The initial balance is transfered from the Voto contract to the deployer.  Now it gets transfered to the governorAlpha address so that governorAlpha can transfer tokens to individual users when they get validated.
    let deployerBalance = await voto.balanceOf(deployer.address);
    let transfer = await voto.connect(deployer).transfer(governorAlpha.address, deployerBalance);
    await transfer.wait(1);
    let governorAlphaBalance = await voto.balanceOf(governorAlpha.address);
    console.log('governorAlphaBalance: ', governorAlphaBalance.toString());
  };
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
};

  await deploy("MinerAPI", {
    from: deployer.address,
    args: [0x0000001],
    // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
    // a large gasLimit. This should be addressed in the following releases.
    // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
    // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
    maxPriorityFeePerGas: priorityFee,
    log: true,
  });

  await deploy("MarketAPI", {
    from: deployer.address,
    args: [],
    // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
    // a large gasLimit. This should be addressed in the following releases.
    // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
    // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
    maxPriorityFeePerGas: priorityFee,
    log: true,
  });
};


module.exports.tags = ["SimpleCoin", "MinerAPI", "MarketAPI"];