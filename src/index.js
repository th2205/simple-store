export default class Store {
  constructor(state) {
    this._state = state;
    this._events = {};
    this._isSending = false;
    this._defferdStates = new Set();
  }

  getState() {
    return this._state;
  }

  on(state, fn) {
    if (!this._events.hasOwnProperty(state)) {
      this._events[state] = [];
    }

    this._events[state].push(fn);
  }

  set(data) {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (data[key] !== this._state[key]) {
        this._state[key] = data[key];
        this._defferdStates.add(key);

        if (!this._isSending) {
          this._defferd();
        }
      }
    }
  }

  _defferd() {
    this._isSending = true;
    setTimeout(() => {
      this._defferdStates.forEach((state) => {
        const events = this._events[state];

        if (events) {
          events.forEach((fn) => fn());
        }
        // this._events[state].forEach((fn) => fn());
      });
      this._isSending = false;
      this._defferdStates.clear();
    });
  }
}
