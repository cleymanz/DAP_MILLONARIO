import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("qqsmChiken", function () {
  it("Should set and get the correct value", async function () {
    const QuienQsmChicken = await ethers.getContractFactory("quienqsmChiken");
    const quienQsm = await QuienQsmChicken.deploy('0x4c9840794Ac292e91de188491bef7804454fDdf4');
    await quienQsm.deployed();
    const resultado = await quienQsm.iniciarJuego();
    expect(resultado).to.be.true; 
  });
});
