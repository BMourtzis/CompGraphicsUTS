import { Object3D, Vector3, Vector2,  BoxBufferGeometry, MeshLambertMaterial, MeshBasicMaterial, Mesh, Raycaster, Group, SphereGeometry, Box3 } from "three";
import { scene, camera, engine } from "./engine";
// import { controls } from "./pointerLockControls";

var colliders = []

var sphereMesh;

function Collider(collisionBox, isTrigger = false, callback) {
  box = collisionBox;

  this.isTrigger = function() { return isTrigger; }

  this.getBox = function() {return box;}
  this.setBox = function(newCollisionBox) { box = newCollisionBox; }

}

function TestCollder() {
  var sphere = new SphereGeometry(10, 32, 32);
  var sphereMaterial = new MeshBasicMaterial({color:0x00ff00});

  sphereMesh = new Mesh(sphere, sphereMaterial);

  sphereMesh.position.set(0, 20, -20);

  var collider = new Box3();
  collider = collider.setFromObject(sphereMesh);

  sphereMesh.addCollider(collider);

  colliders.push(collider);

  scene.add(sphereMesh);

  cameraRaycaster();
}

function cameraRaycaster() {
  var raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 100);

  engine.addUpdate("colliderDetector", () => {
    var direction = new Vector3(0, 0, -1);

    var playerPosition = new Vector3(0, 12, 0);

    raycaster.setFromCamera(new Vector2(), camera );

    if(raycaster.ray.intersectsBox(colliders[0])) {
      console.log("hit");
    }

  });
}

export {
  TestCollder
}
