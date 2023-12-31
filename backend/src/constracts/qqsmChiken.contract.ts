
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { QuienqsmChiken__factory } from '../../../blockchain/typechain/factories/QuienqsmChiken__factory';
import { BlockchainUrlsEnum } from './urls';

dotenv.config();

export const getquienqsmcontract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.QQSMCHIKEN_CONTRACT_ADDRESS!,
    QuienqsmChiken__factory.abi,
    wallet,
  );
};