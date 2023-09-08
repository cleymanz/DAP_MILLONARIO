import cors from 'cors';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import express, { Express, Request, Response, request } from 'express';
import { getquienqsmcontract } from './constracts/qqsmChiken.contract';
import { getChikenTokenContract } from './constracts/ChikenToken.contract';
//import { mintChikenTokens } from './constracts/ChikenToken.contract';  // Asegúrate de importarlo correctamente
import { ethers} from 'ethers';
import Web3 from 'web3';
import { ChikenToken } from '../../blockchain/typechain/ChikenToken';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com')); // Reemplaza 'INFURA_URL' con tu URL de Infura o tu proveedor RPC

app.options('*', cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

const getApiData = async () => {
  const response =  getquienqsmcontract();
  
};
//OK
app.get('/verificar-saldo', async (req, res) => {
  const walletAddress = req.query.address;
  const requiredBalance = 50;

  try {
    const chikenTokenContract = getChikenTokenContract();
    const balanceTokenRaw = await chikenTokenContract.balanceOf(walletAddress as string);
    const balanceToken = parseFloat(ethers.formatEther(balanceTokenRaw));
    const hasSufficientBalance = balanceToken >= requiredBalance;

    res.json({ success: hasSufficientBalance, balance: balanceToken });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
//OK
app.get('/obtener-pregunta-aleatoria', async (req: Request, res: Response) => {
  const contrato = getquienqsmcontract();

  try {
    const cantidadDePreguntas = 50;
    const indiceAleatorio = Math.floor(Math.random() * cantidadDePreguntas);
    const preguntaAleatoria = await contrato.obtenerPreguntaAleatoria(indiceAleatorio);
    const respuestaSerializada = {
      enunciado: preguntaAleatoria[0],
      opciones: preguntaAleatoria[1].map((opcion: any) => opcion.toString()),
      respuestaCorrecta: preguntaAleatoria[2].toString(),
    };
    
    res.status(200).json(respuestaSerializada);  // Envía el objeto directamente

  } catch (error) {
    console.error("Error al obtener la pregunta aleatoria:", error);
    res.status(500).send("Error al obtener la pregunta aleatoria.");
  }
});

app.post('/iniciar-juego', async (req, res) => {
  try {
  const contrato = getquienqsmcontract();
  const txResponse = await contrato.iniciarJuego();
  if (txResponse instanceof Error || txResponse.error) {
    throw new Error(`Error from Ethereum: ${txResponse.error.message}`);
}
  console.log('Mensaje txResponse: ', txResponse);
  const receipt = await txResponse.wait();
  res.status(200).send({
      message: 'Juego iniciado con éxito',
      txHash: receipt.transactionHash
  });
    } catch (error) {
      console.error('Error al iniciar el juego:', error);
      res.status(500).send('Error al iniciar el juego.');
    }
});

app.post('/enviar-respuesta', async (req: Request, res: Response) => {
  try {
    const { walletAddress, respuesta } = req.body; // Obtiene la dirección de billetera y la respuesta del cuerpo de la solicitud
    const contrato = getquienqsmcontract(); // Obtén la instancia del contrato

    // Llama a la función responder en tu contrato
    const tx = await contrato.responder(respuesta, { from: walletAddress });

    // Espera a que la transacción sea minada
    await tx.wait();

    res.status(200).send({ message: "Respuesta enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar la respuesta:", error);
    res.status(500).send("Error al enviar la respuesta.");
  }
});

app.get('/aprobar-transferencia', async (req, res) => {
  const walletAddress = req.query.address;
  const requiredBalance = 50;

  try {
    const chikenTokenContract = getChikenTokenContract();
    const aprobar = await chikenTokenContract.approve(walletAddress as string, requiredBalance);
    res.json({ success: aprobar});
    console.log('Wallet aprobado');
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
/*
app.get('/mint', async (req, res) => {
  const amount = typeof req.query.amount === 'string' ? req.query.amount : undefined;
  const recipientAddress = typeof req.query.recipientAddress === 'string' ? req.query.recipientAddress : undefined;

  if (!amount || !recipientAddress) {
      return res.status(400).json({ success: false, message: 'amount and recipientAddress are required' });
  }

  try {
      const receipt = await mintChikenTokens(amount, recipientAddress);
      res.json({ success: true, receipt });
  } catch (error: any) {
      console.error("Error minting tokens:", error);
      res.status(500).json({ success: false, message: error.message });
  }
});
*/

app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});

