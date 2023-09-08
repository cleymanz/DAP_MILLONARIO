import { useState, useEffect } from 'react';
import { getPreguntaAleatoria } from '../fetchers/quienqsm';
import { IPregunta } from '../components/types';
<<<<<<< HEAD
import {enviarRespuesta} from '../fetchers/quienqsm';
=======
/*
export const LlamarPreguntas = () => {
  interface IPregunta {
    enunciado: string;
    opciones: string[];
    respuestaCorrecta: string;
  }
>>>>>>> parent of c727f5c (05/09)

  const [pregunta, setpregunta] = useState<IPregunta | null>(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string>("");

<<<<<<< HEAD
  const handleRespuesta = async (index: number) => {
    setRespuestaSeleccionada(index);
    try {
      const response = await enviarRespuesta(index);
      if (response.message === "Respuesta enviada con éxito") {

      }
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    }
  };
=======
  //res.json({ success: hasSufficientBalance, balance: balanceEth });


  useEffect(() => {
    const fetchPregunta = async () => {
      const data = await getPreguntaAleatoria();
      setpregunta(data);
    }
    fetchPregunta();
  }, []);
>>>>>>> parent of c727f5c (05/09)

  useEffect(() => {

  }, []);

  return (
<<<<<<< HEAD
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
      margin: 'auto',
      gap: '10px'
    }}
  >
    {pregunta && (
      <>
        <p>{pregunta.enunciado}</p>
        {pregunta.opciones.map((opcion, index) => (
          <button key={index} onClick={() => handleRespuesta(index)}>
            {opcion}
          </button>
        ))}
        {respuestaSeleccionada !== null && (
          <div>
            {esCorrecto ? '¡Correcto, Pasamos a la siguiente Pregunta!' : `Incorrecto. La respuesta correcta era: ${pregunta.opciones[parseInt(pregunta.respuestaCorrecta) - 1]}`}
          </div>
=======
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
>>>>>>> parent of c727f5c (05/09)
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