import Observable from './observable';

const observable = new Observable();

const notify = (eventType, props) => {
  observable.fireEvent(eventType, props);
};

const watch = (eventType, handler) => {
  if (typeof eventType !== 'string') {
    throw new Error('Event name must be a string');
  }
  if (typeof handler !== 'function') {
    throw new Error(`Event listener "${eventType}" must be a function`);
  }
  return observable.on(eventType, handler);
};

export { notify, watch };
