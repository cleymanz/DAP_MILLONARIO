import { headers } from './headers';
import {IPregunta} from '../components/types';
//import { getquienqsmcontract } from './../../../backend/src/constracts/quienqsm.contract';
/*
export const getVerificaWallet = async (wallet_usuario: string) =>
  await fetch('http://localhost:20001/verificar-saldo', { method: 'GET', headers }).then((response) =>
    response.json()
  );
  */
//OK
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

//OK
export const getPreguntaAleatoria = async () => {
  try {
    const response = await fetch(`http://localhost:20001/obtener-pregunta-aleatoria`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
   }
    const data = await response.json();
    data.respuestaCorrecta = parseInt(data.respuestaCorrecta, 10);
    return data as IPregunta;
  } catch (error) {
    console.error('Error en la obtención de la pregunta:', error);
    throw error;
  }
}

//OK
export const setRespuestaSeleccionada = async (option: number) => {
  const response = await fetch('http://localhost:20001/set-respuesta-seleccionada', {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json'
      // ... cualquier otro encabezado que necesites
    },
    body: JSON.stringify({ message: option })  // Enviando la opción como cuerpo de la solicitud
  });

  if (!response.ok) {
    throw new Error('Error al enviar la respuesta seleccionada');
  }

  return response.json();
};

export const getaprobarjuego = async (address: string) => {
  try {
    const response = await fetch(`http://localhost:20001/approve-tokens?address=${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al aprobar la billetera:', error);
    throw error;
  }
}

export const getIniciarJuego = async () => {
  try {
    const response = await fetch('http://localhost:20001/iniciar-juego', {
      method: 'POST', // Aquí es donde especificas el método POST
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log('DATA INFORMACIÓN: ',data);
    return data;
  } catch (error: any) {
    console.error('Error al iniciar el juego:', error);
    throw error;
  }
};

export const enviarRespuesta = async (respuesta: number) => {
  try {
    const response = await fetch(`http://localhost:20001/enviar-respuesta`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},body: JSON.stringify({respuesta}),});

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar la respuesta:', error);
    throw error;
  }
};
