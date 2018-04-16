import { Vector3, Vector2, MeshBasicMaterial, Mesh, Raycaster, SphereGeometry, Box3 } from "three";
import { scene, camera, engine } from "./engine";
import { Component } from "./component";

let colliders = []

let sphereMesh;

const colliderSymbol = Symbol("collider");

//BUG: how to update collider location
//NOTE: Possible issue might be the location of the box with the relative location
function Collider(box, trigger = false, eventFunction) {
  Object.setPrototypeOf(this, new Component(colliderSymbol));

  let isTrigger = trigger
  let collisionBox = box;
  let triggerEvent = eventFunction;

  this.isTrigger = function() {
    return isTrigger;
  }

  this.getCollisionBox = function() {
    return collisionBox;
  }

  this.setCollisionBox = function(newCollisionBox) {
    collisionBox = newCollisionBox;
  }

  this.onTrigger = function() {
    if(isTrigger) {
      triggerEvent()
    }
  }
}

function testCollder() {
  let sphere = new SphereGeometry(10, 32, 32);
  let sphereMaterial = new MeshBasicMaterial({ color: 0x00ff00 });

  sphereMesh = new Mesh(sphere, sphereMaterial);

  sphereMesh.position.set(0, 20, -20);

  let collisionBox = new Box3();
  collisionBox = collisionBox.setFromObject(sphereMesh);

  let collider = new Collider(collisionBox);

  sphereMesh.addComponent(collider);

  colliders.push(collider);

  scene.add(sphereMesh);

  cameraRaycaster();

  engine.addUpdate("sphereUpdate", () => {
    sphereMesh.position.x += 0.1;
  })
}

function cameraRaycaster() {
  let raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 100);

  engine.addUpdate("colliderDetector", () => {
    raycaster.setFromCamera(new Vector2(), camera );

    if(raycaster.ray.intersectsBox(colliders[0].getCollisionBox())) {
      console.log("hit");
    }

  });
}

export {
  testCollder
}
