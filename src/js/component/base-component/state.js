import EventBus from './event-bus';

const eventBus = new EventBus();

const EVENT_STATE_CHANGE = '$EVENT_STATE_CHANGE';

/**
 * @param eventType
 * @param props
 */
const notify = (eventType, props) => {
  eventBus.publish(eventType, props);
};

/**
 * Deletes `state.` from the beginning
 * @param path
 * @returns {string}
 */
const clearPath = (path) => path.split('.').slice(1).join('.');

/**
 * @param path
 * @returns {string}
 */
const pathToEventName = (path) => path.split('.').map((section) => section.toUpperCase()).join('_');

/**
 * @param eventType
 * @param handler
 * @returns {{unsubscribe}}
 */
const watch = (eventType, handler) => {
  if (typeof eventType !== 'string') {
    throw new Error('Event name must be a string');
  }
  if (typeof handler !== 'function') {
    throw new Error(`Event listener "${eventType}" must be a function`);
  }
  return eventBus.subscribe(eventType, handler);
};

/**
 * @param state
 * @param path
 * @returns {null|string|number|array|object}
 */
const query = (state, path) => {
  const querySearch = (chunks, chunkPos, node) => {
    if (chunkPos === chunks.length) {
      return null;
    }

    const propertyName = chunks[chunkPos];

    if (typeof node !== 'object') {
      return null;
    }

    if (!(propertyName in node)) {
      return null;
    }

    if (chunkPos + 1 === chunks.length) {
      return node[propertyName];
    }

    return querySearch(chunks, chunkPos + 1, node[propertyName]);
  };

  return querySearch(path.split('.'), 0, state);
};

/**
 * @param state
 * @param watchers
 * @param broadcast
 * @param path
 * @returns {boolean|*}
 */
const createState = (state, watchers, broadcast, path) => {
  const pathTo = path || 'state';
  const stateWatchers = watchers || {};
  const notifyEveryone = broadcast || false;

  if (typeof state !== 'object' || state === null) {
    throw new Error('State must be object');
  }

  if (typeof stateWatchers !== 'object' || Array.isArray(stateWatchers)) {
    throw new Error('Watchers must be an object');
  }

  const callLocalWatcher = (watcherId, props) => {
    if (watcherId in stateWatchers && typeof stateWatchers[watcherId] === 'function') {
      stateWatchers[watcherId](props);
    }
  };

  Object.keys(state).forEach((childPropName) => {
    // Nested Object
    if (typeof state[childPropName] === 'object' && state[childPropName] !== null) {
      Reflect.set(
        state,
        childPropName,
        createState(state[childPropName], stateWatchers, `${pathTo}.${childPropName}`),
      );
    } else if (typeof state[childPropName] === 'function') {
      throw new Error(
        `State must be an object without behaviour, "${childPropName}" is a function`,
      );
    }
  });

  const handler = {
    set(target, property, newValue) {
      const isArray = Array.isArray(target);
      const oldValue = isArray ? [...target] : target[property];

      if (isArray && property === 'length') {
        return Reflect.set(target, property, newValue);
      }

      const pathToProperty = clearPath(`${pathTo}.${property}`);
      const result = Reflect.set(target, property, newValue);
      const props = {
        action: 'set', property, newValue, oldValue, path: pathToProperty,
      };

      callLocalWatcher(pathToEventName(pathToProperty), props);
      callLocalWatcher('$onChange', props);

      if (notifyEveryone) {
        notify(EVENT_STATE_CHANGE, props);
      }

      return result;
    },

    deleteProperty(target, property) {
      const pathToProperty = `${pathTo}.${property}`;
      const props = {
        action: 'delete', property, path: clearPath(pathToProperty),
      };
      callLocalWatcher(pathToEventName(pathToProperty), props);
      callLocalWatcher('$onChange', props);
      if (notifyEveryone) {
        notify(EVENT_STATE_CHANGE, props);
      }
      return Reflect.deleteProperty(target, property);
    },

    apply(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentsList);
    },

    has(target, property) {
      return query(target, property) !== null;
    },
  };

  return new Proxy(state, handler);
};

export {
  createState, notify, watch, query,
};
