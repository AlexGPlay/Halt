export default function createRoot(domNode) {
  return {
    render(element) {
      domNode.appendChild(element);
    },
    unmount(element) {
      domNode.removeChild(element);
    },
    rerender(element) {
      domNode.replaceChild(element);
    },
  };
}
