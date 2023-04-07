const refs = {
    onBody: document.querySelector('body'),
    stopBtn: document.querySelector('[data-stop]'),
    startBtn: document.querySelector('[data-start]'),
 };

 refs.stopBtn.addEventListener('click', stopColor);
 refs.startBtn.addEventListener('click', startColor);

 refs.stopBtn.setAttribute('disabled', false);

 let timerId = null;

 function startColor(evt) {
    refs.startBtn.setAttribute('disabled', false);
    refs.stopBtn.toggleAttribute('disabled');
    timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.onBody.style.backgroundColor = color;
    }, 1000);
 }

function stopColor(evt) {
    refs.startBtn.toggleAttribute('disabled');
    refs.stopBtn.toggleAttribute('disabled');
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }