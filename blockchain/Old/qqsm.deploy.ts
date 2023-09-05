import { ethers } from 'hardhat';

async function main() {
  const Qqsm = await ethers.getContractFactory('QuienQuiereSerMillonario');
  const qqsm = await Qqsm.deploy();

  await qqsm.deployed();

  console.log('Greeter deployed to:', qqsm.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});