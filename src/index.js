class Store {
  constructor(state) {
    this._state = state;
    this._events = {};
    this._timeoutId;
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
      if (
        data[key] !== undefined &&
        this._state[key] !== undefined &&
        data[key] !== this._state[key]
      ) {
        this._state[key] = data[key];
        this._defferdStates.add(key);

        if (!this._timeoutId) {
          this._defferd();
        } else {
          clearTimeout(this._timeoutId);

          this._defferd();
        }
      }
    }
  }

  _defferd() {
    this._timeoutId = setTimeout(() => {
      this._defferdStates.forEach((state) => {
        this._events[state].forEach((fn) => fn());
      });
      this._defferdStates.clear();
    }, 10);
  }
}
