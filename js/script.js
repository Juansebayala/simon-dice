const $botonEmpezar = document.querySelector('#empezar');
$botonEmpezar.onclick = comenzarJuego;

let numeroRonda = 0;
let cuadrosSeleccionadosMaquina = [];
let cuadrosSeleccionadosJugador = [];

function comenzarJuego() {
  resetearJuego();
  manejarRonda();
}

function manejarRonda() {
  numeroRonda++;
  actualizarNumeroRonda(numeroRonda);
  cambiarMensajeEstado('Espera que la máquina termine su turno');
  cuadrosSeleccionadosMaquina.push(conseguirCuadroAleatorio());
  cuadrosSeleccionadosMaquina.forEach(function($cuadro, index) {
    const retraso = (index + 1) * 1000;
    setTimeout(function() {
     resaltar($cuadro);
    }, retraso);
  });

  const retrasoTurnoJugador = 1000 * (numeroRonda + 1);
  setTimeout(function() {
    cuadrosSeleccionadosJugador = [];
    cambiarMensajeEstado('Ahora es tu turno, selecciona los cuadros correctos');
    desbloquearInputJugador();
  }, retrasoTurnoJugador);
}

function comenzarTurnoJugador(e) {
  const $cuadro = e.target;
  resaltar($cuadro);
  cuadrosSeleccionadosJugador.push($cuadro);
  const $cuadroMaquina = cuadrosSeleccionadosMaquina[cuadrosSeleccionadosJugador.length -1];
  if ($cuadro.id !== $cuadroMaquina.id) {
    resetearJuego();
    cambiarMensajeEstado('¡Perdiste! Tocá "empezar" para comenzar el juego de nuevo', true);
  } 
  
  if (cuadrosSeleccionadosJugador.length === cuadrosSeleccionadosMaquina.length) {
    bloquearInputJugador();
    setTimeout(manejarRonda, 1000);
  }
}

function actualizarNumeroRonda(ronda) {
  document.querySelector('#ronda').textContent = ronda;
}

function desbloquearInputJugador() {
  document.querySelectorAll('.cuadro').forEach(function($cuadro) {
    $cuadro.onclick = comenzarTurnoJugador;
  });
}

function bloquearInputJugador() {
  document.querySelectorAll('.cuadro').forEach(function($cuadro) {
    $cuadro.onclick = '';
  });
}

function cambiarMensajeEstado(mensaje, perdiste = false) {
  const $estado = document.querySelector('#estado');
  $estado.textContent = mensaje;
  if (perdiste) {
    $estado.classList.remove('alert-primary');
    $estado.classList.add('alert-danger');
  } else {
    $estado.classList.remove('alert-danger');
    $estado.classList.add('alert-primary');
  }
}

function conseguirCuadroAleatorio() {
  const indiceAleatorio = Math.floor(Math.random()*4);
  const $cuadros = document.querySelectorAll('.cuadro');
  return $cuadros[indiceAleatorio];
}

function resaltar(cuadro) {
  cuadro.style.opacity = 1;
  setTimeout(function() {
    cuadro.style.opacity = 0.5;
  }, 500);
}

function resetearJuego() {
  bloquearInputJugador();
  cuadrosSeleccionadosMaquina = [];
  numeroRonda = 0;
}
