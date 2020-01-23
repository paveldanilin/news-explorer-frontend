export default class Observable {
  constructor() {
    this.subscriptions = {};
  }

  on(eventName, handler) {
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = {
        seq: 0,
        subjects: {},
      };
    }

    const id = this.subscriptions[eventName].seq;
    this.subscriptions[eventName].seq += 1;
    this.subscriptions[eventName].subjects[id] = handler;

    return {
      unsubscribe: () => {
        delete this.subscriptions[eventName].subjects[id];
        if (Object.keys(this.subscriptions[eventName].subjects).length === 0) {
          delete this.subscriptions[eventName];
        }
      },
    };
  }

  fireEvent(eventName, props) {
    if (this.subscriptions[eventName] === undefined) {
      return;
    }
    Object
      .keys(this.subscriptions[eventName].subjects)
      .forEach((key) => {
        this.subscriptions[eventName].subjects[key](props);
      });
  }

  clear() {
    this.subscriptions = {};
  }
}
