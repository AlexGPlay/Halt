export default function useState(defaultState) {
  const owner = window.renderKey;
  const callIndex = window.components[owner].callIndex;
  window.components[owner].callIndex++;

  if (window.components[owner].state[callIndex] === undefined) {
    window.components[owner].state[callIndex] = defaultState;
  }

  const setValue = (newValue) => {
    queueMicrotask(() => {
      if (typeof newValue === "function") {
        window.components[owner].state[callIndex] = newValue(
          window.components[owner].state[callIndex]
        );
        window.components[owner].onStateChange();
      } else {
        window.components[owner].state[callIndex] = newValue;
        window.components[owner].onStateChange();
      }
    });
  };

  return [window.components[owner].state[callIndex], setValue];
}
