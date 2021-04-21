class Store {
  events = {};
  state = {};

  constructor(state) {
    this.state = state;
    this.timeoutId;
    this.defferdStates = new Set();
  }

  getState() {
    return this.state;
  }

  on(state, fn) {
    if (!this.events.hasOwnProperty(state)) {
      this.events[state] = [];
    }

    this.events[state].push(fn);
  }

  set(data) {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (
        data[key] !== undefined &&
        this.state[key] !== undefined &&
        data[key] !== this.state[key]
      ) {
        this.state[key] = data[key];
        this.defferdStates.add(key);

        if (!this.timeoutId) {
          this._defferd();
        } else {
          clearTimeout(this.timeoutId);

          this._defferd();
        }
      }
    }
  }

  _defferd() {
    this.timeoutId = setTimeout(() => {
      this.defferdStates.forEach((state) => {
        this.events[state].forEach((fn) => fn());
      });
      this.defferdStates.clear();
    }, 10);
  }
}

const store = new Store({
  list: [],
  isLoading: false
});

store.on('list', () => {
  console.log(store.getState().list);
});

store.on('isLoading', () => {
  const isLoading = store.getState().isLoading;

  if (isLoading) return console.log('loading');
  console.log('is not loading');
});

async function work() {
  store.set({
    isLoading: true
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      // debugger;
      store.set({
        list: [111]
      });
      resolve();
    }, 3000);
  });

  store.set({
    isLoading: false
  });
}
store.set({
  list: [1]
});

store.set({
  list: [2]
});

store.set({
  list: [3]
});

work();
