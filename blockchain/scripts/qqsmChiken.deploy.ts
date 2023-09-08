import { ethers } from 'hardhat';

async function main() {
  const QqsmChiken = await ethers.getContractFactory('quienqsmChiken');
  const qqsmChiken = await QqsmChiken.deploy('0x4c9840794Ac292e91de188491bef7804454fDdf4');

  await qqsmChiken.deployed();

  console.log('QuienqsmChiken deployed to:', qqsmChiken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});