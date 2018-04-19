import { Vector3, Vector2, Raycaster, Box3, Box3Helper } from "three";
import { scene, camera, engine } from "./engine";

let colliders = [];

let playerCollider;

function addCollider(object, updateFunction) {
  let box = new Box3();
  //Calculate Bounding Box
  box.setFromObject(object);

  if(engine.DEBUG) {
    // Adds box wireframe for debug
    let boxHelper = new Box3Helper(box, 0xff0000);
    scene.add(boxHelper);
  }

  colliders.push(box);

  if(updateFunction) {
    engine.addUpdate("colliderUpdate", updateFunction);
  }

  return box;
}

function addPlayerCollider() {
  playerCollider = new Box3();

  //NOTE: makes these into parameters
  let center = new Vector3(0, 6, 0);
  let size = new Vector3(5, 12, 5);

  playerCollider.setFromCenterAndSize(center, size);

  if(engine.DEBUG) {
    // Adds box wireframe for debug
    let newHelper = new Box3Helper(playerCollider, 0x0000ff);
    scene.add(newHelper);
  }

  return playerCollider;
}

function updatePlayerCollider(vector) {
  playerCollider.translate(vector);
}

function validateMovement(vector) {
  //TODO: check if this updates the given box;
  let box = playerCollider.clone();
  box.translate(vector);
  for(let collider of colliders) {
    if(box.intersectsBox(collider)) {
      return false;
    }
  }

  return true;
}

// old code used to test rays and intersections
function cameraRaycaster() {
  let raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 100);

  engine.addUpdate("colliderDetector", () => {
    raycaster.setFromCamera(new Vector2(), camera);
    let [sphere] = colliders;
    let box = sphere.geometry.boundingBox;

    if(raycaster.ray.intersectsBox(box)) {
      console.log("hit");
    }

  });
}

export {
  addCollider,
  validateMovement,
  addPlayerCollider,
  updatePlayerCollider
}
