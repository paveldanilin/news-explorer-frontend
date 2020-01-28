export default class Observable {
  constructor() {
    this._subscriptions = {};
  }

  on(eventType, handler) {
    if (!this._subscriptions[eventType]) {
      this._subscriptions[eventType] = {
        seq: 0,
        subjects: {},
      };
    }

    const id = this._subscriptions[eventType].seq;
    this._subscriptions[eventType].seq += 1;
    this._subscriptions[eventType].subjects[id] = handler;

    return {
      unsubscribe: () => {
        delete this._subscriptions[eventType].subjects[id];
        if (Object.keys(this._subscriptions[eventType].subjects).length === 0) {
          delete this._subscriptions[eventType];
        }
      },
    };
  }

  fireEvent(eventType, props) {
    if (this._subscriptions[eventType] === undefined) {
      return;
    }
    Object
      .keys(this._subscriptions[eventType].subjects)
      .forEach((key) => {
        this._subscriptions[eventType].subjects[key](props);
      });
  }

  unsubscribeAll() {
    this._subscriptions = {};
  }
}
