import cors from 'cors';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import express, { Express, Request, Response, request } from 'express';
import { getquienqsmcontract } from './constracts/qqsmChiken.contract';
import { getChikenTokenContract } from './constracts/ChikenToken.contract';
import { getpreguntascontract } from './constracts/preguntasqqsm.contract';
//import { mintChikenTokens } from './constracts/ChikenToken.contract';  // Asegúrate de importarlo correctamente
import { ethers} from 'ethers';
import Web3 from 'web3';

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
  const contrato = getpreguntascontract();

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
    const { walletAddress, respuesta } = req.body;
    const contrato = getquienqsmcontract();
    const tx = await contrato.responder(respuesta, { from: walletAddress });
    await tx.wait();
    res.status(200).send({ message: "Respuesta enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar la respuesta:", error);
    res.status(500).send("Error al enviar la respuesta.");
  }
});

app.get('/approve-tokens', async (req, res) => {
  const walletAddress = req.query.address;
  const requiredBalance = 50;
  try {
    const chikenTokenContract = getquienqsmcontract();
    const tx = await chikenTokenContract.approve(walletAddress as string, requiredBalance);
    res.status(200).send({ message: 'Tokens approved successfully', txHash: tx.transactionHash });
  } catch (error:any) {
    console.error('Error approving tokens:', error);
    res.status(500).send('Error approving tokens.');
  }
});
/*
app.get('/aprobar-juego', async (req, res) => {
  const walletAddress = req.query.address;
  const requiredBalance = 50;
  try {
    const  = getquienqsmcontract();
    const aprobar = await chikenTokenContract.aprobarTransferencia(walletAddress as string, requiredBalance);
    res.json({ success: aprobar});
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
¨*/
app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
