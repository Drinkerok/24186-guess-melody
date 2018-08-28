export default (seconds) => ({
  time: seconds,
  tick() {
    this.time--;

    return {
      done: this.time === 0,
    };
  },
});
