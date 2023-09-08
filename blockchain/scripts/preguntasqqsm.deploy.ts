import { ethers } from 'hardhat';
async function main() {
  const Preguntasqqsm = await ethers.getContractFactory('preguntasqqsm');
  const preguntasqqsm = await Preguntasqqsm.deploy();
  console.log("deployando contrato Preguntasqqsm...");
  await preguntasqqsm.deployed();
  console.log('Preguntasqqsm deployed to:', preguntasqqsm.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});