var countdown;

const alarm = function () {
  let alarm = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
  );

  alarm.play();
};

const padLeft = function (num) {
  if (num.toString().length < 2) return `0${num}`;

  return num;
};

const reset = function () {
  timer.data.time = 60;
};

const tick = function () {
  timer.data.time--;
  timer.data.running = true;

  if (timer.data.time === 0) {
    stop();
    alarm();
  }
};

const start = function () {
  if (timer.data.time === 0) {
    reset();
  }

  tick();

  countdown = window.setInterval(tick, 1000);
};

const stop = function () {
  window.clearInterval(countdown);
  timer.data.running = false;
};

var clickHandler = function (event) {

    // Check if a timer action button was clicked
    var action = event.target.getAttribute('data-action');
    if (!action) return;

    // If it's the start button, start the timer
    if (action === 'start') {
        start();
        return;
    }

    // If it's the stop button, stop the timer
    if (action === 'stop') {
        stop();
        return;
    }

    // If it's the clear button, reset
    if (action === 'clear') {
        stop();
        reset();
    }

};

var timer = new Reef('#pomodoro-timer', {
    data: {
        time: 60,
        running: false
    },
    template: function (props) {
        return `
            <div id="timer">
                ${parseInt(props.time / 60, 10).toString() + ':' + padLeft(props.time % 60)}
            </div>
            <p>
                <button data-action="${props.running ? 'stop' : 'start'}">${props.running ? 'Pause' : 'Start'}</button>
                <button data-action="clear">Reset</button>
            </p>`;
    }
});

// Render the timer into the DOM
timer.render();

// Listen for clicks
document.addEventListener('click', clickHandler, false);
