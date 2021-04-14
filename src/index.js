class Store {
  events = {};
  state = {};

  constructor(state) {
    this.state = state;
    this.isExsistTimeout = false;
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
    const events = this.events;
    const keys = Object.keys(data);

    let timer;

    for (const key of keys) {
      if (
        data[key] !== undefined &&
        this.state[key] !== undefined &&
        data[key] !== this.state[key]
      ) {
        this.state[key] = data[key];
        // events[key].forEach((fn) => {
        //   fn();
        // });

        if (!this.isExsistTimeout) {
          this.isExsistTimeout = true;
          timer = setTimeout(() => {
            events[key].forEach((fn) => {
              fn();
            });
            this.isExsistTimeout = false;
          }, 10);
        } else {
          clearTimeout(timer);
          timer = setTimeout(() => {
            events[key].forEach((fn) => {
              fn();
            });
            this.isExsistTimeout = false;
          }, 10);
        }
      }
    }
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

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  store.set({
    list: [12],
    isLoading: false
  });
}
// store.set({
//   list: [1]
// });

// store.set({
//   list: [2]
// });

work();
