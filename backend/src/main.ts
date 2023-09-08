import cors from 'cors';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import express, { Express, Request, Response } from 'express';
import { getquienqsmcontract } from './constracts/qqsmChiken.contract';
import { getChikenTokenContract } from './constracts/ChikenToken.contract'; // Asegúrate de importarlo correctamente
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

app.post('/iniciar-juego', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body; // Obtiene la dirección de billetera del cuerpo de la solicitud
    const contrato = getquienqsmcontract(); // Obtén la instancia del contrato

    // Llama a la función iniciarJuego en tu contrato
    const tx = await contrato.iniciarJuego({ from: walletAddress });

    // Espera a que la transacción sea minada
    await tx.wait();

    res.status(200).send({ message: "Juego iniciado con éxito" });
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
    res.status(500).send("Error al iniciar el juego.");
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

/*
app.put('/set-respuesta-seleccionada', async (req: Request, res: Response) => {
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
¨*/


/*
app.post('/iniciar-juego', async (req: Request, res: Response) => {
  try {
    const contract = getquienqsmcontract(); // Usa tu función para obtener la instancia del contrato

    // Llama a la función iniciarJuego en tu contrato
    const tx = await contract.iniciarJuego();
    await tx.wait(); // Espera a que la transacción sea minada

    res.status(200).send({ message: "Juego iniciado con éxito" });
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
    res.status(500).send("Error al iniciar el juego.");
  }
});
*/
app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});

