// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');

let userSelectedDate;

flatpickr('#datetime-picker', {
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
      window.alert('Please choose a date in the future');
    }
  },
});
