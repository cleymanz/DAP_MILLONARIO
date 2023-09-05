import { useState, useEffect } from 'react';
import { IPregunta } from '../components/types';

export const LlamarPreguntas = ({ pregunta }: { pregunta: IPregunta }) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [esCorrecto, setEsCorrecto] = useState<boolean | null>(null);

  const handleRespuesta = (index: number) => {
    setRespuestaSeleccionada(index);
    // Aquí estás comparando la respuesta del jugador con la respuesta correcta.
    setEsCorrecto(index === parseInt(pregunta.respuestaCorrecta) - 1); // Restamos 1 porque la indexación de arrays empieza en 0.
  };

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
        {respuestaSeleccionada !== null && (
          <div>
            {esCorrecto ? '¡Correcto!' : `Incorrecto. La respuesta correcta era: ${pregunta.opciones[parseInt(pregunta.respuestaCorrecta) - 1]}`}
          </div>
        )}
      </>
    )}
  </div>
  );
};