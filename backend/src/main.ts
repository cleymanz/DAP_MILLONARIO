import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { getqqsmcontract } from './constracts/qqsm.contract';
import { getAddress } from 'ethers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const Web3 = require('');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com')); // Reemplaza 'INFURA_URL' con tu URL de Infura o tu proveedor RPC

app.options('*', cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/verificar-saldo', async (req, res) => {
  const walletAddress = req.query.address;

  try {
      const balanceWei = await web3.eth.getBalance(walletAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      const hasSufficientBalance = parseFloat(balanceEth) >= 50; // Cambia 50 según tus requerimientos

      res.json({ success: hasSufficientBalance, balance: balanceEth });
  } catch (error) {
     // res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/inicio', async (req, res) => {
  const walletAddress = req.query.address;

  try {
      const balanceWei = await web3.eth.getBalance(walletAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      const hasSufficientBalance = parseFloat(balanceEth) >= 50; // Cambia 50 según tus requerimientos

      res.json({ success: hasSufficientBalance, balance: balanceEth });
  } catch (error) {
     // res.status(500).json({ success: false, error: error.message });
  }
});
/*
app.get('/contract', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const response = contract.getAddress();
  res.json({
    //message: response
    message: response
  });
});

app.get('/pool', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const response = contract.getAddress();
  res.json({
    //message: response
    message: response
  });
});

app.put('/login2', async (req: Request, res: Response) => {
  const contract = getqqsmcontract();
  const response = await contract.set
  res.json({
    message: response
  });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/*
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
*/
app.listen(port, () => {
  console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
