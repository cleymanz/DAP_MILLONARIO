// SPDX-License-Identifier:UNKNOWN 
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract preguntasqqsm is Ownable{
    Pregunta[] public preguntas;
    struct Pregunta {
    string enunciado;
    string[4] opciones;
    uint8 respuestaCorrecta;
    }
    constructor() {
        preguntas.push(Pregunta("Cual de estos personajes jamas aparecio en la revista Time como 'Hombre del Ano'?",["Adolf Hitler", "Ayatola Jomeini", "Joseph Stalin","Mao Zedong"],4));
        preguntas.push(Pregunta("Cual es la capital de Francia", ["Berlin", "Madrid", "Roma", "Paris"], 4));
        preguntas.push(Pregunta("Cual planeta es conocido como el Planeta Rojo", ["Marte", "Venus", "Saturno", "Jupiter"], 1));
        preguntas.push(Pregunta("Que instrumento musical tiene teclas blancas y negras", ["Guitarra", "Trompeta", "Flauta", "Piano"], 4));
        preguntas.push(Pregunta("Cual es el mayor oceano del mundo", ["Atlantico", "Indico", "Pacifico", "Artico"], 3));
        preguntas.push(Pregunta("Cual es el rio mas largo del mundo", ["Amazonas", "Nilo", "Yukon", "Misisipi"], 2));
        preguntas.push(Pregunta("Cuantos lados tiene un heptagono", ["5", "6", "7", "8"], 3));
        preguntas.push(Pregunta("En que pais se originaron los Juegos Olimpicos", ["Grecia", "Roma", "Egipto", "Inglaterra"], 1));
        preguntas.push(Pregunta("Quien escribio Romeo y Julieta", ["Mark Twain", "Charles Dickens", "William Shakespeare", "Jane Austen"], 3));
        preguntas.push(Pregunta("Cual es el elemento quimico con el simbolo Au", ["Oxigeno", "Plata", "Aurio", "Oro"], 4));
        preguntas.push(Pregunta("Cual es el juego de mesa que usa fichas con numeros", ["Ajedrez", "Poker", "Domino", "Monopolio"], 3));
        preguntas.push(Pregunta("Cual es el principal ingrediente en la guacamole", ["Tomate", "Aguacate", "Limon", "Cebolla"], 2));
        preguntas.push(Pregunta("En que deporte se usa una pelota pequena y blanca y se juega en un campo verde", ["Tennis", "Beisbol", "Golf", "Futbol"], 3));
        preguntas.push(Pregunta("Que animal es conocido como el rey de la selva", ["Elefante", "Tigre", "Leon", "Girafa"], 3));
        preguntas.push(Pregunta("Cual es la moneda oficial de Japon", ["Yuan", "Rupia", "Won", "Yen"], 4));
        preguntas.push(Pregunta("Cual ave es conocida por su capacidad para imitar sonidos", ["Gorrion", "Loro", "Aguila", "Cuervo"], 2));
        preguntas.push(Pregunta("Cual de estos instrumentos es de cuerda", ["Trompeta", "Flauta", "Violin", "Tambor"], 3));
        preguntas.push(Pregunta("Cual de estos es un gas noble", ["Helio", "Hidrogeno", "Oxigeno", "Nitrogeno"], 1));
        preguntas.push(Pregunta("Que pais es conocido como la tierra del sol naciente", ["China", "Corea del Sur", "Vietnam", "Japon"], 4));
        preguntas.push(Pregunta("Cual de estos es un planeta enano en nuestro sistema solar", ["Marte", "Venus", "Pluto", "Saturno"], 3));
        preguntas.push(Pregunta("Cual es el metal mas usado para hacer joyas", ["Hierro", "Plata", "Bronce", "Cobre"], 2));
        preguntas.push(Pregunta("Cual es el organo responsable de bombear sangre en el cuerpo humano", ["Higado", "Estomago", "Rinon", "Corazon"], 4));
        preguntas.push(Pregunta("Cual es la capital de Australia", ["Melbourne", "Sydney", "Canberra", "Perth"], 3));
        preguntas.push(Pregunta("Que pais es famoso por sus piramides", ["Peru", "India", "Mexico", "Egipto"], 4));
        preguntas.push(Pregunta("Que pais tiene una hoja de arce en su bandera", ["Estados Unidos", "Nueva Zelanda", "Canada", "Reino Unido"], 3));
        preguntas.push(Pregunta("Cual animal es conocido por llevar su casa a cuestas", ["Tortuga", "Cangrejo", "Caracol", "Lombriz"], 1));
        preguntas.push(Pregunta("En que pais se encuentra el Coliseo", ["Espania", "Italia", "Grecia", "Francia"], 2));
        preguntas.push(Pregunta("Que planeta es conocido por sus anillos", ["Marte", "Jupiter", "Venus", "Saturno"], 4));
        preguntas.push(Pregunta("Cual de estos elementos es necesario para que haya fuego", ["Tierra", "Aire", "Agua", "Metal"], 2));
        preguntas.push(Pregunta("Cuantos huesos tiene el esqueleto humano adulto", ["206", "213", "195", "220"], 1));
        preguntas.push(Pregunta("Que instrumento se usa principalmente en un examen de vista", ["Estetoscopio", "Termometro", "Otoscopio", "Optometro"], 4));
        preguntas.push(Pregunta("Cual es el animal mas grande del mundo", ["Elefante Africano", "Ballena Azul", "Tiburon Blanco", "Oso Polar"], 2));
        preguntas.push(Pregunta("En que continente se encuentra el Sahara", ["Asia", "America", "Europa", "Africa"], 4));
        preguntas.push(Pregunta("Que pais es famoso por su canal que conecta dos oceanos", ["Mexico", "Brasil", "Panama", "Argentina"], 3));
        preguntas.push(Pregunta("Que estructura celular contiene el ADN", ["Ribosoma", "Lisosoma", "Mitocondria", "Nucleo"], 4));
        preguntas.push(Pregunta("En que deporte se compite por la Copa Davis", ["Futbol", "Basketball", "Tenis", "Beisbol"], 3));
        preguntas.push(Pregunta("Cual de estos no es un continente", ["Oceania", "Antartida", "Europa", "Amazonia"], 4));
        preguntas.push(Pregunta("Cual es la montania mas alta del mundo", ["K2", "Everest", "Kilimanjaro", "Aconcagua"], 2));
        preguntas.push(Pregunta("Cual es el idioma oficial de Brasil", ["Espaniol", "Ingles", "Frances", "Portugues"], 4));
        preguntas.push(Pregunta("Cuantos colores tiene un arcoiris", ["5", "6", "7", "8"], 3));
        preguntas.push(Pregunta("Que pais es conocido como la tierra de los kiwis", ["Canada", "Australia", "Nueva Zelanda", "Sudafrica"], 3));
        preguntas.push(Pregunta("Cual es la capital de Brasil", ["Buenos Aires", "Rio de Janeiro", "Lima", "Brasilia"], 4));
        preguntas.push(Pregunta("Que ciudad es conocida como 'La Ciudad de los Vientos'", ["Los Angeles", "Nueva York", "Chicago", "Miami"], 3));
        preguntas.push(Pregunta("En que deporte se usa un bate y una pelota para correr bases", ["Criquet", "Rugby", "Beisbol", "Hockey"], 3));
        preguntas.push(Pregunta("Que planeta esta mas cerca del sol", ["Marte", "Mercurio", "Venus", "Tierra"], 2));
        preguntas.push(Pregunta("Cual es el animal que da lana", ["Cabra", "Vaca", "Oveja", "Caballo"], 3));
        preguntas.push(Pregunta("Cual de estos paises no tiene una costa maritima", ["Bolivia", "Chile", "Ecuador", "Colombia"], 1));
        preguntas.push(Pregunta("Cual es el libro sagrado del Islam", ["Biblia", "Torah", "Vedas", "Coran"], 4));
        preguntas.push(Pregunta("Cual de estos instrumentos tiene 88 teclas", ["Guitarra", "Arpa", "Piano", "Violin"], 3));
    }
    function obtenerPreguntaAleatoria(uint256 indice) public view returns (string memory enunciado, string[4] memory opciones, uint8 respuestaCorrecta) {
    Pregunta storage pregunta = preguntas[indice];
    enunciado = pregunta.enunciado;
    opciones = pregunta.opciones;
    respuestaCorrecta = pregunta.respuestaCorrecta;
    }
}