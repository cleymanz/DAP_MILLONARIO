import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('qqsm', function () {
  it("Should return the new message once it's changed", async function () {
    const Quien = await ethers.getContractFactory('QuienQuiereSerMillonario');
    const messenger = await Quien.deploy();
    await messenger.deployed();

    expect(await messenger.APUESTA_INICIAL).to.equal(50);

    const setGreetingTx = await messenger.APUESTA_INICIAL();

    // wait until the transaction is mined
    await setGreetingTx._hex;

    expect(await messenger.APUESTA_INICIAL()).to.equal(50);
  });
});
