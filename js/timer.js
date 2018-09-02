export default (seconds) => ({
  time: seconds,
  tick() {
    this.time--;
    this.ontick();

    return {
      done: this.time === 0,
    };
  },
  ontick() {}
});
