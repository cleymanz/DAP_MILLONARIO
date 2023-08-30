import { headers } from './headers';

export const getMessengerMessage = async () =>
  await fetch('http://localhost:20001/verificar-saldo', { method: 'GET', headers }).then((response) =>
    response.json()
  );