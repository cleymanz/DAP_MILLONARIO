import { headers } from './headers';
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

export const setRespuestaSeleccionada = async (option: Number) =>
  await fetch(`http://localhost:20001/obtener-pregunta-aleatoria/?respuesta=${option}`,{
    method: 'PUT',
    headers
  }).then((response) => response.json());

export const getPreguntaAleatoria = async () => {
  try {
    const response = await fetch(`http://localhost:20001/obtener-pregunta-aleatoria`);
    const data = await response.json();
    console.log("data entregada getPreguntaAleatoria", data);
    return data;
  } catch (error) {
    console.error('Error en la obtención de la pregunta:', error);
    throw error;
  }
}