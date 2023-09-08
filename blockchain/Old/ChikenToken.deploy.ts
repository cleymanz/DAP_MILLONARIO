/*
import { ethers } from 'hardhat';

async function main() {
  const ChikenToken = await ethers.getContractFactory("ChikenToken");
  const initialSupply = ethers.utils.parseUnits("10000", 18)

  const token = await ChikenToken.deploy(initialSupply);

  await token.deployed();

  console.log('ChikenToken deployed to:', token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/