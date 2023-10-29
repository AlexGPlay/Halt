module.exports = function (babel) {
  const t = babel.types;
  return {
    name: "halt-jsx-plugin",
    visitor: {
      JSXElement(path) {
        // Get the opening element from the JSXElement node
        const openingElement = path.node.openingElement;

        // Arguments for Halt.createElement function
        const args = [];
        const tagName = openingElement.name.name;

        // If we have a tag name that starts with a capital letter, assume it's a component
        const isUppercase = tagName[0] === tagName[0].toUpperCase();
        const value = isUppercase
          ? t.identifier(tagName)
          : t.stringLiteral(tagName);
        args.push(value);

        // Handle props
        const hasProps = openingElement.attributes.length > 0;
        let props = null;

        if (hasProps) {
          props = t.objectExpression(
            openingElement.attributes.map((attribute) => {
              const key = t.stringLiteral(attribute.name.name);
              const value = attribute.value;

              if (t.isJSXExpressionContainer(value)) {
                // If the attribute value is an expression container, handle it as an arrow function
                // Modify the handling of JSXExpressionContainer here
                return t.objectProperty(key, value.expression);
              } else {
                // Otherwise, handle it as a regular value
                return t.objectProperty(key, value);
              }
            })
          );
        }

        args.push(props || t.nullLiteral());

        // Handle children, including text nodes
        const children = path.node.children.map((child) => {
          if (t.isJSXElement(child)) {
            return child;
          } else if (t.isJSXExpressionContainer(child)) {
            return child.expression; // Return the expression directly
          } else if (t.isJSXText(child) && child.value.trim() !== "") {
            return t.stringLiteral(child.value);
          }
          return null;
        });

        // Filter out null values to handle cases with no children
        args.push(t.arrayExpression(children.filter(Boolean)));

        // Create the CallExpression
        const haltIdentifier = t.identifier("Halt");
        const createElementIdentifier = t.identifier("createElement");
        const callee = t.memberExpression(
          haltIdentifier,
          createElementIdentifier
        );
        const callExpression = t.callExpression(callee, args);

        // Replace JSXElement node with the CallExpression
        path.replaceWith(callExpression);
      },
    },
  };
};
