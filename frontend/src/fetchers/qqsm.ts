import { headers } from './headers';
export const getqqsmpool = async () =>
  await fetch('http://localhost:20001/pool', { method: 'GET', headers }).then((response) =>
    response.json()
  );