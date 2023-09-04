import { useState, useEffect } from 'react';
import { getPreguntaAleatoria } from '../fetchers/quienqsm';
import { IPregunta } from '../components/types';
/*
export const LlamarPreguntas = () => {
  interface IPregunta {
    enunciado: string;
    opciones: string[];
    respuestaCorrecta: string;
  }

  const [pregunta, setpregunta] = useState<IPregunta | null>(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string>("");

  //res.json({ success: hasSufficientBalance, balance: balanceEth });


  useEffect(() => {
    const fetchPregunta = async () => {
      const data = await getPreguntaAleatoria();
      setpregunta(data);
    }
    fetchPregunta();
  }, []);

  return (
    <div>
        {pregunta && (
            <>
            <h1>{pregunta.enunciado}</h1>
            <form>
              {pregunta.opciones.map((opcion, index) => (
                <div key={index}>
                  <input 
                    type="radio" 
                    name="opcion" 
                    value={opcion} 
                    onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                  />
                  <label>{opcion}</label>
                </div>
              ))}
              <button type="button" onClick={async () => await setRespuestaSeleccionada(respuestaSeleccionada)}>Responder</button>
            </form>
          </>
        )}
    </div>
  );
}; 
*/
export const LlamarPreguntas = ({ pregunta }: { pregunta: IPregunta }) => {
  console.log("Not found", pregunta);
  //... resto de tu código ...
  return (
    <div>
        {pregunta && (
            <>
            <h1>{pregunta.enunciado}</h1>
            {/* ... resto de tu código ... */}
          </>
        )}
    </div>
  );
};