const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const background = document.body;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const setBackgroundColor = () => {
  const randomColor = getRandomHexColor();
  background.style.backgroundColor = randomColor;
  background.style.color = randomColor;
};

setBackgroundColor();

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    setBackgroundColor();
    // console.log(`I love async JS!  ${Math.random()}`);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  console.log(`Interval with id ${timerId} has stopped!`);
});
