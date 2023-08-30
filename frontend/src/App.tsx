import { useEffect, useState } from 'react';
import './App.css';
//import { ChangeMessengerMessage } from './components/ChangeMessengerMessage';
//import { getMessengerMessage } from './fetchers/messenger';
import { getVerificaSaldo } from './fetchers/qqsm';
import { getVerificaWallet } from './fetchers/qqsm'; from './fetchers/qqsm'

function App() {
  const [message, setMessage] = useState();

  const getApiData = async () => {
    const response = await getVerificaSaldo();
    setMessage(response.message);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <h1>{message}</h1>

      {message && <ChangeMessengerMessage currentMessage={message} />}
    </div>
  );
}

export default App;
