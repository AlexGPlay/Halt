export default function createRoot(domNode) {
  return {
    render(element) {
      domNode.appendChild(element);
    },
  };
}
