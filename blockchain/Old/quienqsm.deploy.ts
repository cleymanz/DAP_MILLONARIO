import { ethers } from 'hardhat';

async function main() {
  const qqsm = await ethers.getContractFactory("quienqsm");
  const token = await qqsm.deploy();

  await token.deployed();

  console.log('Quien quiere ser millonario deployed to:', token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});