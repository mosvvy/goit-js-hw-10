// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');

let dataDays = document.querySelector('span[data-days]');
let dataHours = document.querySelector('span[data-hours]');
let dataMinutes = document.querySelector('span[data-minutes]');
let dataSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;
let userTimer;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        progressBarColor: '#B51B1B',
        overlayColor: '#FFBEBE',
      });
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

startBtn.addEventListener('click', event => {
  startBtn.disabled = true;
  dateInput.disabled = true;

  userTimer = setInterval(() => {
    // console.log(convertMs(userSelectedDate - Date.now()));
    const delta = convertMs(userSelectedDate - Date.now());

    dataDays.textContent = delta.days;
    dataHours.textContent = delta.hours;
    dataMinutes.textContent = delta.minutes;
    dataSeconds.textContent = delta.seconds;
  }, 1000);
});
