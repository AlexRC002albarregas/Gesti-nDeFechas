const inputFecha = document.getElementById('fechaObjetivo');
const contadorDiv = document.getElementById('contador');
let intervalo; // Variable para guardar el intervalo activo

function actualizarContador(fechaLimite) {
  const ahora = new Date();
  const diferencia = fechaLimite - ahora;

  if (diferencia <= 0) {
    // Mostrar todos los valores en 0
    contadorDiv.innerHTML = `0 Meses, 0 Días, 0 Horas, 0 Minutos, 0 Segundos`;
    contadorDiv.className = "contador rojo";
    clearInterval(intervalo); // Detener el intervalo cuando el tiempo ha terminado
    return;
  }

  const meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
  const días = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  contadorDiv.innerHTML = `${meses} Meses, ${días} Días, ${horas} Horas, ${minutos} Minutos, ${segundos} Segundos`;

  // Cambiar el color en función del tiempo restante
  const díasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  if (díasRestantes > 30) {
    contadorDiv.className = "contador verde";
  } else if (díasRestantes <= 14 && díasRestantes > 7) { // Cambiar a naranja si quedan menos de 14 días y más de 7 días
    contadorDiv.className = "contador naranja";
  } else if (díasRestantes <= 7) { // Cambiar a rojo si quedan menos de 7 días
    contadorDiv.className = "contador rojo";
  }
}

inputFecha.addEventListener('change', () => {
  if (intervalo) {
    clearInterval(intervalo); // Limpiar cualquier intervalo previo
  }
  
  const fechaLimite = new Date(inputFecha.value);
  
  // Iniciar un nuevo intervalo
  intervalo = setInterval(() => actualizarContador(fechaLimite), 1000);
});
