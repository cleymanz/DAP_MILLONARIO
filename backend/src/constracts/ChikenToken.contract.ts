import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { ChikenToken__factory } from '../../../blockchain/typechain/factories/ChikenToken__factory';
import { BlockchainUrlsEnum } from './urls';

dotenv.config();

export const getChikenTokenContract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.CHICKEN_CONTRACT_ADDRESS!,
    ChikenToken__factory.abi,
    wallet
  );
};
