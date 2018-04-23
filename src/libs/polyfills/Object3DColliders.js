import { Object3D } from 'three';

function init() {
  Object3D.prototype.addComponent = addComponent;
  Object3D.prototype.removeComponent = removeComponent;
  Object3D.prototype.findComponent = findComponent;
  Object3D.prototype.getComponents = getComponents;
}

function addComponent(component) {
  if(this.components === undefined) { this.components = []; }
  // checkComponents();
  if(!component.isComponent) { throw Error("You can only add components"); }
  this.components.push(component);
}

function removeComponent(component) {
  if(this.components === undefined) { this.components = []; }
  if(!component.isComponent) { throw Error("You can only remove components"); }
  this.components.remove(component);
}

function findComponent(id) {
  if(this.components === undefined) { this.components = []; }
  let component = this.components.find((comp) => {
    comp.id === id;
  });

return component;
}

function getComponents(type) {
  if(this.components === undefined) { this.components = []; }
  let components = this.components.filter((comp) => {
    return comp.getType() === type;
  });

  return components;
}

export default init;
