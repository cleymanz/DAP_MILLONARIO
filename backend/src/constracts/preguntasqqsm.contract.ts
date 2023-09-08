
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { Preguntasqqsm__factory } from '../../../blockchain/typechain/factories/Preguntasqqsm__factory';
import { BlockchainUrlsEnum } from './urls';

dotenv.config();

export const getpreguntascontract = (
  url: BlockchainUrlsEnum = BlockchainUrlsEnum.POLYGON_MUMBAI
) => {
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.PREGUNTASQQSM_CONTRACT_ADDRESS!,
    Preguntasqqsm__factory.abi,
    wallet,
  );
};