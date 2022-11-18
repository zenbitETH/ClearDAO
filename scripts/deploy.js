const Timelock = require('../frontend/src/contracts/contracts/Timelock.sol/Timelock.json');
const SafeMath = require('../frontend/src/contracts/contracts/SafeMath.sol/SafeMath.json');
const Comp = require('../frontend/src/contracts/contracts/Comp.sol/Comp.json');
const GovernorAlpha = require('../frontend/src/contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json');
// const GovernorBravoDelegate = require('../frontend/src/contracts/contracts/GovernorBravoDelegate.sol/GovernorBravoDelegate.json');
// const GovernorBravoDelegator = require('../frontend/src/contracts/contracts/GovernorBravoDelegator.sol/GovernorBravoDelegator.json');
// const GovernorBravoInterfaces = require('../frontend/src/contracts/contracts/GovernorBravoInterfaces.sol/GovernorBravoInterfaces.json');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const SafeMath = await ethers.getContractFactory('SafeMath');
  const safeMath = await SafeMath.deploy();
  console.log('SafeMath address: ', safeMath.address);
  setAddressInCompiledContracts(safeMath, 'SafeMath');

  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(deployer.address, 259200);
  console.log('Timelock address: ', timelock.address);
  setAddressInCompiledContracts(timelock, 'Timelock');

  const Comp = await ethers.getContractFactory('Comp');
  const comp = await Comp.deploy(deployer.address);
  console.log('Comp address: ', comp.address);
  setAddressInCompiledContracts(comp, 'Comp');

  const GovernorAlpha = await ethers.getContractFactory('GovernorAlpha');
  const governorAlpha = await GovernorAlpha.deploy(timelock.address, comp.address, deployer.address);
  console.log('GovernorAlpha address: ', governorAlpha.address);
  setAddressInCompiledContracts(governorAlpha, 'GovernorAlpha');

  // const GovernorBravoDelegate = await ethers.getContractFactory('GovernorBravoDelegate');
  // const governorBravoDelegate = await GovernorBravoDelegate.deploy();
  // console.log('GovernorBravoDelegate address: ', governorBravoDelegate.address);
  // setAddressInCompiledContracts(governorBravoDelegate, 'GovernorBravoDelegate');

  // const GovernorBravoDelegator = await ethers.getContractFactory('GovernorBravoDelegator');
  // const governorBravoDelgator = await GovernorBravoDelegator.deploy();
  // console.log('GovernorBravoDelegator address: ', governorBravoDelgator.address);
  // setAddressInCompiledContracts(governorBravoDelgator, 'GovernorBravoDelegator');

  // const GovernorBravoInterfaces = await ethers.getContractFactory('GovernorBravoInterfaces');
  // const governorBravoInterfaces = await GovernorBravoInterfaces.deploy();
  // console.log('GovernorBravoInterfaces address: ', governorBravoInterfaces.address);
  // setAddressInCompiledContracts(governorBravoInterfaces, 'GovernorBravoInterfaces');


  // const VotoSimple = await ethers.getContractFactory('VotoSimple');
  // const votoSimple = await VotoSimple.deploy();
  // //
  // console.log(`VotoSimple address: ${votoSimple.address}`);

  // let expectedEvent = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("this is the title"));

  // let titleAddedEvent = new Promise((res, rej) => {
  //   votoSimple.on('TitleAdded', (title, fileURL, event) => {
  //     event.removeListener();
  //     res({title, fileURL});
  //   });
  // });

  // let tx = await votoSimple.addUser('this is the title', ethers.BigNumber.from(100));
  // // await tx.wait(1);
  // let titleEvent = await titleAddedEvent;
  // console.log('titleEvent: ', titleEvent.title);
  // console.log('expectedEvent: ', expectedEvent);
  // let num = titleEvent.fileURL.toString();
  // // let num = ethers.BigNumber(titleEvent.fileURL);
  // // num = num.toString();
  // console.log('fileURLEvent: ', num);

  // setAddressInCompiledContracts(votoSimple, 'VotoSimple');
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
