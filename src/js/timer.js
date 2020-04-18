'use strict';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      startBtn: document.querySelector('button[data-action="start"]'),
      stopBtn: document.querySelector('button[data-action="stop"]'),
      days: document.querySelector('[data-value="days"]'),
      hours: document.querySelector('[data-value="hours"]'),
      mins: document.querySelector('[data-value="mins"]'),
      secs: document.querySelector('[data-value="secs"]'),
    };

    // this.updateClockface();
    this.bindEvents();
  }

  start() {
    const startTime = this.targetDate;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = startTime - currentTime;

      if (this.deltaTime < 0) {
        alert('Stop Timer');
        clearInterval(this.timerId);
        return;
      }
      this.updateClockface(this.deltaTime);
      this.enableButton();
    }, 1000);
    return this.timerId;
  }

  stop() {
    clearInterval(this.timerId);
    this.deltaTime = 0;
    this.updateClockface(this.deltaTime);
    this.disableButton();
  }

  updateClockface() {
    const { days, hours, mins, secs } = this.Clockface(this.deltaTime);

    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }

  Clockface(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  bindEvents() {
    this.refs.startBtn.addEventListener('click', this.start.bind(this));
    this.refs.stopBtn.addEventListener('click', this.stop.bind(this));
  }

  disableButton() {
    this.refs.startBtn.removeAttribute('disabled');
    this.refs.stopBtn.setAttribute('disabled', true);
  }

  enableButton() {
    this.refs.stopBtn.removeAttribute('disabled');
    this.refs.startBtn.setAttribute('disabled', true);
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2020'),
  // targetDate: new Date(2020, 3, 18, 14, 49, 5).getTime(),
});
