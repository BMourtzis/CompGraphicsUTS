
//TODO: find a way to add components as a Object3D
function Component(type) {
  let compType = type;
  let parent = {};

  this.isComponent = function() {
    return true;
  }

  this.compId = {};

  this.getType = function() {
    return compType;
  }

  this.setParent = function(parentObj) {
    parent = parentObj;
  }

  this.getParent = function() {
    return parent;
  }
}

export {
  Component
}
