import { Raycaster, Box3, Box3Helper, Vector3, Vector2 } from "three"
import { camera, engine, scene } from "./engine";

let triggers = [];
let raycaster;

let eClicked = false;

let cameraCenter = new Vector2();


/**
 * pointerTriggerInit - Initialises the pointerTrigger functinality including registering an update function
 *
 * @return {NULL}  null
 */
function pointerTriggerInit() {
  //Iniates the raycaster
  raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 100);
  addMoveEvents();

  engine.addUpdate("pointerTriggerUpdate", () => {
    //NOTE: maybe the function binds the position of the camera
    // Set the new origin of the camera and it's direction
    raycaster.setFromCamera(cameraCenter, camera);

    for(let trigger of triggers) {
      //NOTE: throws a warning to use at.
      if(raycaster.ray.intersectBox(trigger.collider)) {
        console.log(trigger.text);
        trigger.lookCallback();
        if(eClicked) {
          // put to false so that it won't keep calling thing functions again and again
          eClicked = false;
          trigger.clickCallback();
        }
        break;
      }
    }
  });
}


/**
 * addPointerTrigger - Registers a pointerTrigger Collider with text and callback functions
 *
 * @param  {type} object        description
 * @param  {type} text          description
 * @param  {type} lookCallback  description
 * @param  {type} clickCallback description
 * @return {type}               description
 */
function addPointerTrigger(object, text, lookCallback = lookCallbackDefault, clickCallback = clickCallbackDefault) {
  let box = new Box3();
  //Calculate Bounding Box
  box.setFromObject(object);

  // Adds box wireframe for debug mode
  if(engine.DEBUG) {
    let boxHelper = new Box3Helper(box, 0x00ff00);
    scene.add(boxHelper);
  }

  triggers.push({collider: box, text, lookCallback, clickCallback});
}

function lookCallbackDefault() {
  //does nothing
}

function clickCallbackDefault() {
  //does nothing
}

// Adds keyDown and keyUp event callbacks
function addMoveEvents() {
  document.addEventListener('keydown', (event) => {
    if(event.keyCode === 69) {
      console.log("keydown");
      eClicked = true;
    }
  }, false);

  document.addEventListener('keyup', (event) => {
    if(event.keyCode === 69) {
      eClicked = false;
    }
  }, false);
}

export {
  pointerTriggerInit,
  addPointerTrigger
};
