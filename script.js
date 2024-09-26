let app = document.getElementById('app');

// Crear un contenedor para la fecha límite en la parte superior de la página
let fechaLimiteDiv = document.createElement('div');
fechaLimiteDiv.id = 'fechaLimite';
document.body.appendChild(fechaLimiteDiv); // Agregar el div de fecha límite al body

// Crear elementos dinámicamente para el contador
let contadorDiv = document.createElement('div');
contadorDiv.id = 'contador';
contadorDiv.className = 'contador blanco'; // Inicia en blanco
contadorDiv.innerHTML = `
  <div class="numeros">
    <span>0</span> <span>0</span> <span>0</span> <span>0</span> <span>0</span>
  </div>
  <div class="unidades">
    <span>Meses</span> <span>Días</span> <span>Horas</span> <span>Minutos</span> <span>Segundos</span>
  </div>`;

// Crear input para seleccionar fecha
let inputFecha = document.createElement('input');
inputFecha.type = 'datetime-local';
inputFecha.id = 'fechaObjetivo';

// Crear botón dinámico con la clase 'button-64'
let aplicarBtn = document.createElement('button');
aplicarBtn.className = 'button-64';
aplicarBtn.innerHTML = '<span class="text">Aplicar Fecha</span>';

// Agregar los elementos al contenedor
app.appendChild(contadorDiv);
app.appendChild(inputFecha);
app.appendChild(aplicarBtn);

let intervalo;

function actualizarContador(fechaLimite) {
  let ahora = new Date();
  let diferencia = fechaLimite - ahora;

  if (diferencia <= 0) {
    // Mostrar todos los valores en 0
    contadorDiv.innerHTML = `
      <div class="numeros">
        <span>0</span> <span>0</span> <span>0</span> <span>0</span> <span>0</span>
      </div>
      <div class="unidades">
        <span>Meses</span> <span>Días</span> <span>Horas</span> <span>Minutos</span> <span>Segundos</span>
      </div>`;
    contadorDiv.className = "contador rojo"; // Cambia a rojo cuando el tiempo se agota
    clearInterval(intervalo);
    return;
  }

  let meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
  let días = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  contadorDiv.innerHTML = `
    <div class="numeros">
      <span>${meses}</span> <span>${días}</span> <span>${horas}</span> <span>${minutos}</span> <span>${segundos}</span>
    </div>
    <div class="unidades">
      <span>Meses</span> <span>Días</span> <span>Horas</span> <span>Minutos</span> <span>Segundos</span>
    </div>`;

  let díasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  // Actualizar el color del contador dependiendo de los días restantes
  if (díasRestantes > 30) {
    contadorDiv.className = "contador verde";
  } else if (díasRestantes <= 14 && díasRestantes > 7) {
    contadorDiv.className = "contador naranja";
  } else if (díasRestantes <= 7) {
    contadorDiv.className = "contador rojo";
  }
}

aplicarBtn.addEventListener('click', () => {
  if (intervalo) {
    clearInterval(intervalo);
  }

  let fechaLimite = new Date(inputFecha.value);

  if (isNaN(fechaLimite.getTime())) {
    alert("Por favor, selecciona una fecha válida.");
    return;
  }

  // Mostrar la fecha límite seleccionada en la parte superior
  fechaLimiteDiv.innerHTML = `Fecha límite: ${fechaLimite.toLocaleString()}`;

  // Iniciar el contador
  intervalo = setInterval(() => actualizarContador(fechaLimite), 1000);
});
