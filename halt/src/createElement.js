window.componentId = 0;
window.renderKey = 0;
window.components = {};

export default function createElement(type, props = {}, children = []) {
  if (typeof type === "function") {
    return createFunctionComponent(type, props, children);
  }

  return createDefaultElement(type, props, children);
}

function createFunctionComponent(type, props, children) {
  const componentId = window.componentId;
  window.componentId++;
  window.components[componentId] = {
    state: [],
    callIndex: 0,
    onStateChange: () => {
      window.renderKey = componentId;
      window.components[componentId].callIndex = 0;
      const newComponent = type({ ...props, children });
      window.components[componentId].components?.replaceWith(newComponent);
      window.components[componentId].components = newComponent;
    },
  };
  window.renderKey = componentId;
  const componentRender = type({ ...props, children });
  window.components[componentId].components = componentRender;
  return componentRender;
}

function createDefaultElement(type, props, children) {
  const element = document.createElement(type);
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
      return;
    }
    element.setAttribute(key, value);
  });

  children.forEach((child) => {
    if (child === null || child === undefined) {
      return;
    }
    if (!child.nodeType) {
      child = document.createTextNode(child);
    }
    element.appendChild(child);
  });
  return element;
}
