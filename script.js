document.addEventListener("DOMContentLoaded", function () {
    const statusDisplay = document.querySelector('.game--status');
    let juegoActivo = true;
    let jugadorActual = "X";
    let tablero = ["", "", "", "", "", "", "", "", ""];
    const jugadasGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const mensajeGanador = () => `El jugador ${jugadorActual} ha Ganado!`;
    const mensajeEmpate = () => `El juego termino en empate!`;
    const jugadorActualTurn = () => `Es el turno de ${jugadorActual}`;

    statusDisplay.innerHTML = jugadorActualTurn();

    function manejoCeldaJugador(clickedCell, clickedCellIndex) {
        tablero[clickedCellIndex] = jugadorActual;
        clickedCell.innerHTML = jugadorActual;
    }

    function manejoCambioJugador() {
        jugadorActual = jugadorActual === "X" ? "O" : "X";
        statusDisplay.innerHTML = jugadorActualTurn();
    }

    function manejoResultado() {
        let roundWon = false;
        for (let i = 0; i < jugadasGanadoras.length; i++) {
            const jugadaGanadora = jugadasGanadoras[i];
            let a = tablero[jugadaGanadora[0]];
            let b = tablero[jugadaGanadora[1]];
            let c = tablero[jugadaGanadora[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = mensajeGanador();
            juegoActivo = false;
            return;
        }

        let roundDraw = !tablero.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = mensajeEmpate();
            juegoActivo = false;
            return;
        }

        manejoCambioJugador();
    }

    function manejoClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
        );
        if (tablero[clickedCellIndex] !== "" || !juegoActivo) {
            return;
        }
        manejoCeldaJugador(clickedCell, clickedCellIndex);
        manejoResultado();
    }

    function manejoReset() {
        juegoActivo = true;
        jugadorActual = "X";
        tablero = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = jugadorActualTurn();
        document.querySelectorAll('.cell')
            .forEach(cell => cell.innerHTML = "");
    }
manejoClick
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', manejoClick));
    document.querySelector('.game--restart').addEventListener('click', manejoReset);
});
