import { useState } from 'react';
import { getVerificaWallet } from '../fetchers/qqsm';

export const VerificaSaldo_wallet = ({ currentUsuario }: { currentUsuario: string }) => {
  const [wallet_usuario, setMessage] = useState(currentUsuario);

  //res.json({ success: hasSufficientBalance, balance: balanceEth });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
        gap: '10px'
      }}
    >
      <input
        placeholder="Ingrese Su billetera (wallet)"
        value={wallet_usuario}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <button onClick={async () => await getVerificaWallet(wallet_usuario)}>Jugar</button>
    </div>
  );
};