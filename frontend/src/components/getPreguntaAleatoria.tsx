import { useState, useEffect } from 'react';
import { IPregunta } from '../components/types';
import {enviarRespuesta} from '../fetchers/quienqsm';

export const LlamarPreguntas = ({ pregunta }: { pregunta: IPregunta }) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [esCorrecto, setEsCorrecto] = useState<boolean | null>(null);

  const handleRespuesta = async (index: number) => {
    setRespuestaSeleccionada(index);
    console.log("respuesta entregada: ", index);
    try {
      const response = await enviarRespuesta(index);
      if (response.message === "Respuesta enviada con éxito") {

      }
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    }
  };

  useEffect(() => {

  }, []);

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
    {pregunta && (
      <>
        <p>{pregunta.enunciado}</p>
        {pregunta.opciones.map((opcion, index) => (
          <button key={index} onClick={() => handleRespuesta(index)}>
            {opcion}
          </button>
        ))}
        {respuestaSeleccionada === parseInt(pregunta.respuestaCorrecta) -1 && (
          <div>
            {'Respuesta correcta!!!'}
          </div>
        )        
        }else{
          <div>
          {'Respuesta incorrecta!!!'}
        </div>
        }
      </>
    )}
  </div>
  );
};