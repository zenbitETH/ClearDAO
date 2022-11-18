const { ethers } = require('hardhat');

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

//This function gives the front end access to the address of the contract, which Ethers uses to generate a local instance
const setAddressInCompiledContracts = (instance, contractAsString) => {
  const fs = require("fs");
  const path = require('path');

  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts", "contracts", `${contractAsString}`);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  };

  instanceAddressPath = path.join(contractsDir, "contract-address.json");
  //Write the address of the deployed contract to the src directory of the front end
  fs.writeFileSync(
    instanceAddressPath,
    JSON.stringify({ [contractAsString]: instance.address }, undefined, 2)
  );
};
