import cors from 'cors';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import express, { Express, Request, Response } from 'express';
import { getquienqsmcontract } from './constracts/quienqsm.contract';
import { getAddress } from 'ethers';
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


app.get('/verificar-saldo', async (req, res) => {
  const walletAddress  = req.query.address;

  try {
      const balanceWei = await web3.eth.getBalance(walletAddress as string);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      const hasSufficientBalance = parseFloat(balanceEth) >= 50; // Cambia 50 según tus requerimientos

      res.json({ success: hasSufficientBalance, balance: balanceEth });
  } catch (error: any) {
     res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/obtener-pregunta-aleatoria', async (req: Request, res: Response) => {
  const contrato = getquienqsmcontract();

  try {
    const cantidadDePreguntas = 50;
    const indiceAleatorio = Math.floor(Math.random() * cantidadDePreguntas);
    const preguntaAleatoria = await contrato.obtenerPreguntaAleatoria(indiceAleatorio);
    const respuestaSerializada = {

      enunciado: preguntaAleatoria[0],
      opciones: preguntaAleatoria[1].map((opcion:any) => opcion.toString()),
      respuestaCorrecta: preguntaAleatoria[2].toString(),
    };

    console.log(preguntaAleatoria);
    console.log(respuestaSerializada);
    const respuestaJson = JSON.stringify(respuestaSerializada);
    res.status(200).json(respuestaJson);

  } catch (error) {
    console.error("Error al obtener la pregunta aleatoria:", error);
    res.status(500).send("Error al obtener la pregunta aleatoria.");
  }
});

app.put('/setRespuestaSeleccionada', async (req: Request, res: Response) => {
  try {
    if(!req.body.message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const option = req.body.message;
    const contract = getquienqsmcontract();
    const response = await contract.responder(option);

    res.json({ message: response });
  } catch (error) {
    console.error("Error al procesar la respuesta:", error);
    res.status(500).send("Error al procesar la respuesta.");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
