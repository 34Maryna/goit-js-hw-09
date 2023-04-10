import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
  
     if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure(
          `❌ Please choose a date in the future`);
          return;
       } else {
        refs.startBtn.removeAttribute('disabled');
      }
      refs.startBtn.addEventListener('click', handleBtn => { 
        let intervaId = null;
         intervaId = setInterval(() => {
          const isActive = false;
          const numberSelectorDates = selectedDates[0].getTime();
          const currentTime = Date.now();
          const timeComponents = numberSelectorDates - currentTime;

          const { days, hours, minutes, seconds } = convertMs(timeComponents);
          if (isActive) {
            return;
          }
          refs.days.textContent = `${addLeadingZero(days)}`;
          refs.hours.textContent = `${addLeadingZero(hours)}`;
          refs.minutes.textContent = `${addLeadingZero(minutes)}`;
          refs.seconds.textContent = `${addLeadingZero(seconds)}`;

        if (
        Number(`${seconds}`) === 00 &&
        Number(`${minutes}`) === 00 &&
        Number(`${hours}`) === 00 &&
        Number(`${days}`) === 00) {
          clearInterval(intervaId);
        }
        }, 1000);
        });
      },
    };

 flatpickr('#datetime-picker', options);
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }