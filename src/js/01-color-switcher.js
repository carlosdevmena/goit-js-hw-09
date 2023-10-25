const body = document.querySelector('body'),
  btnStart = document.querySelector('[data-start]'),
  btnStop = document.querySelector('[data-stop]');
let changeCackgroundColor = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnStart.addEventListener('click', () => { //al dar click en el btn se empieza a cambira de color con la funcion getRandomHexColor cada 1000ms = (1s) gracias a un set interval y se bloquea el btn de start y se desbloquea el de stop
  changeCackgroundColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});
btnStop.addEventListener('click', () => {
  //al dar clocl en el btn se detiene el setinterval con en la variable "changeCackgroundColor" y el btn de stop se bloquea y el de start se desbloquea
  clearInterval(changeCackgroundColor);
  btnStop.disabled = true;
  btnStart.disabled = false;
});
