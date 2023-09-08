// SPDX-License-Identifier:UNKNOWN
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract quienqsmChiken is Ownable{
    IERC20 public chikenToken;
    uint256 public constant APUESTA_INICIAL = 50 ether;
    uint256 public constant LIMITE_FONDOS = 200 ether;
    uint256 public liquidityPool;
    uint256[] public respuestasCorrectas;

    struct Jugador {
        bool estaJugando;
        uint256 premioActual;
        uint8 preguntaActual;
    }

    mapping(address => Jugador) public jugadores;
    mapping(address => uint256) public jugadoresPreguntaActual;

    event JuegoIniciado(address jugador);
    event RespuestaDada(address jugador, uint8 seleccionada, bool correcta);
    event JuegoTerminado(address jugador, uint256 premio);
    event JugadorRetirado(address jugador, uint256 premio);

    modifier fondosSuficientes() {
        require(liquidityPool > LIMITE_FONDOS, "El juego no tiene fondos suficientes.");
        _;
    }

    modifier soloJugador() {
        require(jugadores[msg.sender].estaJugando, "No estas jugando.");
        _;
    }

    constructor(address _chikenTokenAddress) {
        chikenToken = IERC20(_chikenTokenAddress);
        liquidityPool = 1000 ether;
    }
    function retirarse() public {
        require(jugadores[msg.sender].estaJugando = true, "No estas jugando.");
        require(jugadoresPreguntaActual[msg.sender] == 5, "Solo puedes retirarte despues de la pregunta 5.");

        uint256 premio = calcularPremioRetiro(); 
        chikenToken.transfer(msg.sender, premio);
        liquidityPool -= premio;
        jugadores[msg.sender].estaJugando == false;

        emit JugadorRetirado(msg.sender, premio);
    }

    function aprobarTransferencia(address _jugador) external returns (bool) {
    chikenToken.approve(_jugador, APUESTA_INICIAL);
    return true;
    }
//OK
    function iniciarJuego() external payable fondosSuficientes {
        require(chikenToken.allowance(msg.sender,  address(this)) >= APUESTA_INICIAL, "Debes aprobar la transferencia de 50 CHIKEN para jugar.");
        chikenToken.transferFrom(msg.sender, address(this), APUESTA_INICIAL);
        liquidityPool += APUESTA_INICIAL;
        emit JuegoIniciado(msg.sender);
    }
//OK
    function responder(uint256 _respuesta) public {
        require(jugadores[msg.sender].estaJugando == true, "No estas jugando.");

        if (_respuesta == respuestasCorrectas[jugadoresPreguntaActual[msg.sender]]) {
            jugadoresPreguntaActual[msg.sender]++;
            
            if(jugadoresPreguntaActual[msg.sender] == 10) {
                uint256 premio = calcularPremioFinal();
                chikenToken.transfer(msg.sender, premio);
                liquidityPool -= premio;
                jugadores[msg.sender].estaJugando = false;
            }
        } else {
            jugadores[msg.sender].estaJugando = false;
        }
    }

    function finalizarJuego() private {
        emit JuegoTerminado(msg.sender, jugadores[msg.sender].premioActual);
        liquidityPool -= jugadores[msg.sender].premioActual;
        require(chikenToken.transfer(msg.sender, jugadores[msg.sender].premioActual), "La transferencia de tokens CHIKEN ha fallado.");
        delete jugadores[msg.sender];
    }

    function calcularPremioRetiro() private pure returns (uint256) {
        return 5 * 10 ether;
    }

    function calcularPremioFinal() private pure returns (uint256) {
        return 10 * 50 ether;
    }
}