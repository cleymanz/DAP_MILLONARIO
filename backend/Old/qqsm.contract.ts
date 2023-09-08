/*
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { QuienQuiereSerMillonario__factory } from '../../../blockchain/typechain/factories/QuienQuiereSerMillonario__factory';
import { BlockchainUrlsEnum } from './urls';

dotenv.config();

export const getqqsmcontract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.QQSM_CONTRACT_ADDRESS!,
    QuienQuiereSerMillonario__factory.abi,
    wallet,
  );
};
*/