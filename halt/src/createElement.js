export default function createElement(type, props = {}, children = []) {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

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
    if (typeof child === "string") {
      child = document.createTextNode(child);
    }
    element.appendChild(child);
  });
  return element;
}
