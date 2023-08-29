import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { getMessengerContract } from './constracts/messenger.contract';
import { getCTokenContract } from './constracts/ctoken.contract';
import { getqqsmcontract } from './constracts/qqsm.contract';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.options('*', cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/login', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const response = await contract.getAddress();
  res.json({
    message: response
  });
});

app.get('/login2', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const funcion = contract.getFunction("iniciarJuego");
  res.json({
    message: funcion
  });
});

app.get('/login2', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const funcion = contract.getEvent("JuegoIniciado");
  res.json({
    message: funcion
  });
});

//JuegoIniciado

// let message = 'Bienvenido a la web3 🚀'

// app.get('/messenger', async (req: Request, res: Response) => {
//   res.json({
//     message
//   });
// });

// app.put('/messenger', async (req: Request, res: Response) => {
//   message = req.query.message! as string;
//   res.json({
//     message
//   });
// });


/*
app.get('/hello', async (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Web3 🚀'
  });
});

app.get('/ctoken', async (req: Request, res: Response) => {
  const contract = getCTokenContract();
  const response = await contract.getAddress();
  res.json({
    message: response
  });
});

*/

app.get('', async (req: Request, res: Response) => {
  const contract = getCTokenContract()
  const response = await contract.getMessage();
  res.json({
    message: response
  });
});

app.put('/messenger', async (req: Request, res: Response) => {
  const message = req.query.message;
  const contract = getMessengerContract();
  const response = await contract.setMessage(message);
  res.json({
    message: response
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
