import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let numberSelectorDates = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      numberSelectorDates = selectedDates[0].getTime();

      if (numberSelectorDates < Date.now()) {
        Notiflix.Notify.failure(
          `❌ Please choose a date in the future`
        );
        // alert ('Please choose a date in the future');
        startBtn.setAttribute('disabled', false);
      } else {
        startBtn.toggleAttribute('disabled');
      }
    },
  };

  flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', false);
startBtn.addEventListener('click', handleBtn);

function handleBtn() {
  startBtn.setAttribute('disabled', false);
  timer.start();
}

const timer = {
  intervaId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  start() {
    this.intervalId = setInterval(() => {
      const startTime = numberSelectorDates - Date.now();
      if (startTime < 1000) {
        clearInterval(intervalId);
      }
      const timeComponents = convertMs(startTime);
      const { days, hours, minutes, seconds } = this.refs;
    this.refs.days.textContent = addLeadingZero (timeComponents.days);
    this.refs.hours.textContent = addLeadingZero (timeComponents.hours);
    this.refs.minutes.textContent = addLeadingZero (timeComponents.minutes);
    this.refs.seconds.textContent = addLeadingZero (timeComponents.seconds);
    
  if (timeComponents < 1000) {
    clearInterval(this.intervaId);
  }
  }, 1000);
  },
};
  
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