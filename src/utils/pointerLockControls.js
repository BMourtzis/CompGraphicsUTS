import { Object3D, Euler, Vector3, Raycaster } from "three";
import { engine, camera, scene } from "./engine";
import { addPlayerCollider, updatePlayerCollider, validateMovement } from "./collider";

/**
 * @author mrdoob / http://mrdoob.com/
 */

let raycaster;

// let controlsEnabled;
let controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let velocity = new Vector3();
let direction = new Vector3();

const mass = 100.0;

let speedMod = 1;

// Initialises the Point Lock
function pointerLockInit() {
  controls = pointerLockControls();
  raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10);

  scene.add(controls.getObject());

  addPointLock();
  addMoveEvents();
  engine.addUpdate("controls", update);
}

// Adds the lock screen
function addPointLock() {
  // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
  let blocker = document.getElementById('blocker');
  let instructions = document.getElementById('instructions');

  let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if (havePointerLock) {
    let element = document.body;

    let pointerlockchange = () => {
      if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
        // controlsEnabled = true;
        controls.enabled = true;
        blocker.style.display = 'none';
      }
      else {
        controls.enabled = false;
        blocker.style.display = 'block';
        instructions.style.display = '';
      }
    }

    let pointerlockerror = () => {
      instructions.style.display = '';
    };

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', () => {
      instructions.style.display = 'none';
      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
    }, false);
  }
  else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
  }
}

// Adds keyDown and keyUp event callbacks
function addMoveEvents() {
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true;
        break;
      case 37: // left
      case 65: // a
        moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        moveRight = true;
        break;
      case 32: // space
        if (canJump === true) {
          velocity.y += 350;
        }
        canJump = false;
        break;
      case 16: // shift
        speedMod = 0.5;
        break;
      //no default
    }
  }, false);

  document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      case 37: // left
      case 65: // a
        moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        moveRight = false;
        break;
      case 16:
        speedMod = 1;
        break;
      // no default
    }
  }, false);
}

function pointerLockControls() {
  camera.rotation.set(0, 0, 0);

  let pitchObject = new Object3D();
  pitchObject.add(camera);

  let yawObject = new Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  let direction = new Vector3(0, 0, -1);
  let rotation = new Euler(0, 0, 0, "YXZ");

  //adds a collider for the player;
  addPlayerCollider();

  let PI_2 = Math.PI / 2;

  let obj = {
    enabled: false,
    dispose() {
      document.removeEventListener('mousemove', onMouseMove, false);
    },
    getObject() {
      return yawObject;
    },
    getPosition(vector) {
      vector.copy(yawObject.position);

      return vector;
    },
    getDirection(vector) {
      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
      vector.copy(direction).applyEuler(rotation);

      return vector;
    },
    getRotation(vector) {
      let euler = new Euler(0, 0, 0, "YXZ");
      euler.set(0, yawObject.rotation.y, 0);
      vector.applyEuler(euler);

      return vector;
    }
  };

  let onMouseMove = (event) => {
    if (obj.enabled === false) {
      return null;
    }

    let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

    return null;
  };

  document.addEventListener('mousemove', onMouseMove, false);

  return obj;
}

function update() {
  raycaster.ray.origin.copy(controls.getObject().position);
  raycaster.ray.origin.y -= 10;

  let intersections = raycaster.intersectObjects(scene.children);
  let onObject = intersections.length > 0;

  velocity.x -= speedMod * velocity.x * 10.0 * engine.getDelta();
  velocity.z -= speedMod * velocity.z * 10.0 * engine.getDelta();
  velocity.y -= speedMod * 9.8 * mass * engine.getDelta();
  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveLeft) - Number(moveRight);
  // this ensures consistent movements in all directions
  direction.normalize();

  if (moveForward || moveBackward) {
    velocity.z -= direction.z * 400.0 * engine.getDelta();
  }

  if (moveLeft || moveRight) {
    velocity.x -= direction.x * 400.0 * engine.getDelta();
  }

  if (onObject === true) {
    velocity.y = Math.max(0, velocity.y);
    canJump = true;
  }

  // let vector = new Vector3(velocity.x * engine.getDelta(), velocity.y * engine.getDelta(), velocity.z * engine.getDelta());

  let vector = new Vector3(velocity.x * engine.getDelta(), velocity.y * engine.getDelta(), velocity.z * engine.getDelta());

  controls.getRotation(vector);

  //Very basic collision detection
  // BUG: y axis doesn't work correctly
  if(validateMovement(vector)) {
    controls.getObject().translateX(velocity.x * engine.getDelta());
    controls.getObject().translateY(velocity.y * engine.getDelta());
    controls.getObject().translateZ(velocity.z * engine.getDelta());

    updatePlayerCollider(vector);
  }

  //NOTE: maybe I need to add this in the if above
  if (controls.getObject().position.y < 10) {
    velocity.y = 0;
    controls.getObject().position.y = 10;
    canJump = true;
  }
}

export default pointerLockInit;

export {
  controls
}
