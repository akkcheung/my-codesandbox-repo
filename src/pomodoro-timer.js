var countdown;

const alarm = function () {
  let alarm = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
  );

  alarm.play();
};

const padLeft = function (num) {
  if (num.toSring().length < 2) return `0${num}`;

  return num;
};

const reset = function () {
  timer.data.time = 60;
};

const tick = function () {
  timer.data.time--;
  timer.data.running = true;

  if (time.data.time === 0) {
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
  windows.clearInterval(countdown);
  timer.data.running = false;
};
