import { useEffect, useState } from 'react';
import './App.css';
import { getVerificaWallet } from './fetchers/quienqsm';
import {LlamarPreguntas} from './components/getPreguntaAleatoria';
import { getPreguntaAleatoria } from './fetchers/quienqsm';
import { setRespuestaSeleccionada } from './fetchers/quienqsm';
import { IPregunta } from './components/types';

// Importamos el componente si lo vamos a usar.
// import {VerificaSaldo_wallet} from './components/ConsultaSaldoQQSM'

function App() {
  const [address, setAddress] = useState(''); // Añadimos un estado para la dirección.
  const [balance, setBalance] = useState(null); // Estado para el saldo.
  const [pregunta, setPregunta] = useState<IPregunta | null>(null);
  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const data = await getVerificaWallet(address);
      setBalance(data.balance);
      if (data.balance >= 0.0001) {
        const preguntaData = await getPreguntaAleatoria();
        setPregunta(preguntaData);
      }

    } catch (error:any) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleClick = () => {
    if (address) {
      getApiData();
    } else {
      alert('Por favor ingrese una dirección válida.');
    }
    
  };

  return (
    <div className="container">
      <h1 className="title">Quien quiere ser millonario</h1>
      <p className="description">- Para poder jugar, necesitará depositar 50 eth, tendrá que ingresar su dirección de billetera publica y después presionar "Jugar".</p>
      <p className="description">- Si no cuenta con el saldo suficiente, tendrá que recargar y volver a realizar los pasos solicitados anteriormente.</p>
      <p className="description">- La modalidad del juego es simple: Una vez iniciado el juego, tendrá que responder 10 preguntas, por cada pregunta ud ganará 10 ethers.</p>
      <p className="description">- Tiene solo una oportunidad de retirarse y esto es en la pregunta 5, si desea continuar y no responder correctamente hasta finalizar el juego, ud pierde todo.</p>

      <input className="input"
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Ingrese dirección de billetera"
      />
      <button onClick={handleClick} className="button"> Jugar </button>
      {pregunta && <LlamarPreguntas pregunta={pregunta} />}
    </div>
  );
}

export default App;