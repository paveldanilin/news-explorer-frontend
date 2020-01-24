export default class Observable {
  constructor() {
    this.subscriptions = {};
  }

  on(eventType, handler) {
    if (!this.subscriptions[eventType]) {
      this.subscriptions[eventType] = {
        seq: 0,
        subjects: {},
      };
    }

    const id = this.subscriptions[eventType].seq;
    this.subscriptions[eventType].seq += 1;
    this.subscriptions[eventType].subjects[id] = handler;

    return {
      unsubscribe: () => {
        delete this.subscriptions[eventType].subjects[id];
        if (Object.keys(this.subscriptions[eventType].subjects).length === 0) {
          delete this.subscriptions[eventType];
        }
      },
    };
  }

  fireEvent(eventType, props) {
    if (this.subscriptions[eventType] === undefined) {
      return;
    }
    Object
      .keys(this.subscriptions[eventType].subjects)
      .forEach((key) => {
        this.subscriptions[eventType].subjects[key](props);
      });
  }

  unsubscribe() {
    this.subscriptions = {};
  }
}
