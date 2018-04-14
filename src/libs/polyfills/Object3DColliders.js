import { Object3D } from 'three';

var arr = [];

function init() {
  Object3D.prototype.addCollider = addCollider;
}

function addCollider(collider) {
  if(this.colliders == undefined) { this.colliders = []; }
  this.colliders.push(collider);
}

export default init;
