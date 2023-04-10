import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  let amount = 0;
  let timeDelay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let time = timeDelay - step;
  for (let i = 0; i < Number(amountEl.value); i += 1) {
    amount =+ 1;
    time += step;
    createPromise(amount, time)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`
      );
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`
      );
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
 }

