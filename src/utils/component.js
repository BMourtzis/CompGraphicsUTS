
//TODO: find a way to add components as a Object3D
function Component(type) {
  let compType = type;
  let parent = {};

  let component = {
    isComponent() {
      return true;
    },
    compId: {},
    getType() {
      return compType;
    },
    setParent(parentObj) {
      parent = parentObj;
    },
    getParent() {
      return parent;
    }
  }

  return component;
}

export {
  Component
}
