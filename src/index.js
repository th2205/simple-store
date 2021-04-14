class Store {
  events = {};
  state = {};

  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  on(state, fn) {
    if (!this.events.hasOwnProperty(state)) {
      this.events[state] = [fn];
    } else {
      this.events[state] = [...this.events[state], fn];
    }
  }

  set(data) {
    const events = this.events;
    const keys = Object.keys(data);

    for (const key of keys) {
      if (data[key] !== this.state[key]) {
        this.state[key] = data[key];
        events[key].forEach((fn) => {
          fn();
        });
      }
    }
  }
}


  if (!this.events.hasOwnProperty(state)) {
    this.events[state] = [];
  }

  this.events[state].push(fn);

