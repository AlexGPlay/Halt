export default function useEffect(effect, dependencies) {
  const owner = window.renderKey;
  const callIndex = window.components[owner].callIndex;
  window.components[owner].callIndex++;

  if (window.components[owner].effects?.[callIndex] === undefined) {
    if (!window.components[owner].effects) {
      window.components[owner].effects = [];
    }

    window.components[owner].effects[callIndex] = {
      dependencies,
      effect,
    };
    if (Array.isArray(dependencies) && dependencies.length === 0) {
      effect();
    }
  } else {
    if (Array.isArray(dependencies) && dependencies.length === 0) {
      return;
    }
    if (!dependencies) {
      effect();
    } else {
      const existingDependencies =
        window.components[componentId]?.effects?.[callIndex].dependencies || [];
      const isSame = dependencies.every((dependency, index) => {
        return existingDependencies[index] === dependency;
      });
      if (isSame) {
        return;
      }
      if (!window.components[owner].effects) {
        window.components[owner].effects = [];
      }
      window.components[owner].effects[callIndex] = {
        dependencies,
        effect,
      };
      effect();
    }
  }
}
