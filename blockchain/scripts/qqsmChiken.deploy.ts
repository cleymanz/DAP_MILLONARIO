import { ethers } from 'hardhat';
async function main() {
  const QqsmChiken = await ethers.getContractFactory('quienqsmChiken');
  const qqsmChiken = await QqsmChiken.deploy('0x3944E51503EA3631C358994cD7d797D1dffF83b9');
  console.log("deployando contrato QuienqsmChiken...");
  await qqsmChiken.deployed();
  console.log('QuienqsmChiken deployed to:', qqsmChiken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});