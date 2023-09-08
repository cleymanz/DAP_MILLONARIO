//import { headers } from './headers';
import { getquienqsmcontract } from './../../../backend/src/constracts/quienqsm.contract';
/*
export const getVerificaWallet = async (wallet_usuario: string) =>
  await fetch('http://localhost:20001/verificar-saldo', { method: 'GET', headers }).then((response) =>
    response.json()
  );
  */

export const getVerificaWallet = async (address: string) => {
  try {
    const response = await fetch(`http://localhost:20001/verificar-saldo?address=${address}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al verificar el saldo:', error);
    throw error;
  }
}

export const getPreguntas = async (address: string) => {
  try {
    const response = await fetch(`http://localhost:20001/iniciar-juego?address=${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al verificar el saldo:', error);
    throw error;
  }
}