import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const input = document.getElementById('datetime-picker'),
  btnStart = document.querySelector('[data-start]'),
  spanDays = document.querySelector('[data-days]'),
  spanHours = document.querySelector('[data-hours]'),
  spanMinutes = document.querySelector('[data-minutes]'),
  spanSeconds = document.querySelector('[data-seconds]'),
  options = {
    enableTime: true, //Habilita el selector de tiempo (basicamente sin esto no funciona)
    time_24hr: true, //para colocar hora militar (24hr)
    defaultDate: new Date(), //Para tomar la fecha del calendario
    minuteIncrement: 1, //Ajusta el paso para la entrada de minutos (de cuanto en cuanto aumenta o disminuye los minutos del date)
    onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
        return (
          setTimeout(() => {
            Notify.failure('Please choose a date in the future', {
              position: 'center-center',
              clickToClose: true,
              backOverlay: true,
              timeout: 1000,
            });
          }, 500),
          (btnStart.disabled = true)
        );
      }
      btnStart.disabled = false;
      rest = selectedDates[0] - options.defaultDate;
    },
  };
let date = new flatpickr(input, options),
  rest = 0,
  intervalDate = null;
btnStart.addEventListener('click', () => {
  intervalDate = setInterval(() => {
    if (rest <= 0) {
      rest = 0;
      clearInterval(intervalDate);
    }
    const convertNum = convertMs(rest);
    spanDays.textContent = addLeadingZero(convertNum.Days);
    spanHours.textContent = addLeadingZero(convertNum.Hours);
    spanMinutes.textContent = addLeadingZero(convertNum.Minutes);
    spanSeconds.textContent = addLeadingZero(convertNum.Seconds);
    rest -= 1000;
  }, 1000);
  btnStart.disabled = true;
});
function convertMs(ms) {
  // Number of milliSeconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining Days
  const Days = Math.floor(ms / day);
  // Remaining Hours
  const Hours = Math.floor((ms % day) / hour);
  // Remaining Minutes
  const Minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining Seconds
  const Seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { Days, Hours, Minutes, Seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
