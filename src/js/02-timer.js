import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const inputTimePicker = document.querySelector('#datetime-picker');

const newDays = document.querySelector('[data-days]');
const newHours = document.querySelector('[data-hours]');
const newMinutes = document.querySelector('[data-minutes]');
const newSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(new Date());
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};

flatpickr(inputTimePicker, options);

function changeTimerValue() {
  let timer = setInterval(() => {
    let countdown = new Date(inputTimePicker.value) - new Date();
    startBtn.disabled = true;
    inputTimePicker.disabled = true;
    // console.log(countdown);
    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      newDays.textContent = timerData.days;
      newHours.textContent = timerData.hours;
      newMinutes.textContent = timerData.minutes;
      newSeconds.textContent = timerData.seconds;
      console.log(timerData);
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
