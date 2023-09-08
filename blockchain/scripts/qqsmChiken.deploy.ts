import { ethers } from 'hardhat';
async function main() {
  const QqsmChiken = await ethers.getContractFactory('quienqsmChiken');
  const qqsmChiken = await QqsmChiken.deploy('0x6064730Ee875bd5eda23566988927dB097194920');
  console.log("deployando contrato QuienqsmChiken...");
  await qqsmChiken.deployed();
  console.log('QuienqsmChiken deployed to:', qqsmChiken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});