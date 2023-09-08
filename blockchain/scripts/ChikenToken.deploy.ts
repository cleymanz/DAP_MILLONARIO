import { ethers } from 'hardhat';
async function main() {
  const ChikenToken = await ethers.getContractFactory("ChikenToken");
  const initialSupply = ethers.utils.parseUnits("50000", 18)
  const token = await ChikenToken.deploy(initialSupply);
  console.log('deployando ChikenToken ...');
  await token.deployed();
  console.log('ChikenToken deployed to:', token.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});