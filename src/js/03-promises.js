import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form'),
  fisrtDelay = document.querySelector('[name="delay"]'),
  delayStep = document.querySelector('[name="step"]'),
  amount = document.querySelector('[name="amount"]'),
  btnCreate = document.getElementById('submit');
let promise,
  delayStepValue = 0,
  cont = 0,
  timeOutDelay = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
  cont = 0;
  timeOutDelay = 0;
  btnCreate.disabled = true;
  createPromise(parseInt(amount.value), parseInt(fisrtDelay.value));
  btnCreate.disabled = false;
});

function createPromise(position, delay) {
  delayStepValue = parseInt(delayStep.value);
  setTimeout(() => {
    timeout(position, delay);
  }, delay);
  setInterval(() => {
    timeout(position, delay);
  }, delayStepValue);
}

function timeout(position, delay) {
  delayStepValue = parseInt(delayStep.value);
  if (cont < position) {
    const shouldResolve = Math.random() > 0.3;
    promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve('valor'); // Pasa el valor deseado a la función resolve()
      } else {
        reject('error'); // Pasa la razón del rechazo a la función reject()
      }
    });
    promise
      .then(value => {
        timeOutDelay = delay + delayStepValue * (position - (cont + 1)) + 1000;
        Notify.success(
          `✅ Fulfilled promise ${cont + 1} in ${
            delay + delayStepValue * cont
          }ms`,
          {
            useIcon: false,
            timeout: timeOutDelay,
            pauseOnHover: false,
          }
        );
        cont += 1;
        timeOutDelay -= delayStepValue;
      })
      .catch(error => {
        timeOutDelay = delay + delayStepValue * (position - (cont + 1)) + 1000;
        Notify.failure(
          `❌ Rejected promise ${cont + 1} in ${
            delay + delayStepValue * cont
          }ms`,
          {
            useIcon: false,
            timeout: timeOutDelay,
            pauseOnHover: false,
          }
        );
        cont += 1;
        timeOutDelay -= delayStepValue;
      });
  }
}
