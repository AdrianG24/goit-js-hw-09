import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  for (let i = 0; i < amount.value; i++) {
    const promiseDelay = Number(delay.value) + step.value * i;
    console.log(promiseDelay);
    createPromise(i + 1, promiseDelay)
      .then(
        ({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        },
        {
          timeout: 4000,
        }
      )
      .catch(
        ({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        },
        {
          timeout: 4000,
        }
      );
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
