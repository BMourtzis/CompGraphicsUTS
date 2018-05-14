import { Raycaster, Box3, Box3Helper, Vector3, Vector2 } from "three"
import { camera, engine, scene } from "./engine";
import { controls } from "./pointerLockControls";


/**
 * The list with all the triggers registered
 */
let triggers = [];

/**
 * A raycaster that continuously generates a ray
 */
let raycaster;

/**
 * A boolean that says whether or not e is clicked
 */
let eClicked = false;


/**
 * The center of the camera location.
 * Used to generate the rays
 */
let cameraCenter = new Vector2();


/**
 * The method to call when you press E
 */
let clickCallback = clickCallbackDefault;

/**
 * pointerTriggerInit - Initialises the pointerTrigger functinality including registering an update function
 *
 * @return {NULL}  null
 */
function pointerTriggerInit() {
  //Iniates the raycaster
  // NOTE: I should reduce the range of the ray
  raycaster = new Raycaster(new Vector3(), new Vector3(), 0, 3);
  addMoveEvents();

  engine.addUpdate("pointerTriggerUpdate", () => {
    //NOTE: maybe the function binds the position of the camera
    // Set the new origin of the camera and it's direction
    // raycaster.setFromCamera(cameraCenter, controls);

    let position = new Vector3();
    controls.getPosition(position);
    let direction = new Vector3();
    controls.getDirection(direction);

    raycaster.set(position, direction);

    for(let trigger of triggers) {
      //NOTE: throws a warning to use at.
      if(raycaster.ray.intersectBox(trigger.collider)) {
        // TODO: put the text to the UI, instead of a console log
        console.log(trigger.text);
        trigger.lookCallback();
        clickCallback = trigger.clickCallback;
        //Break after you detect an intersection
        break;
      }
      else {
        clickCallback = clickCallbackDefault;
      }
    }
  });
}


/**
 * addPointerTrigger - Registers a pointerTrigger Collider with text and callback functions
 *
 * @param  {Mesh}     object        The mesh that will the boundingBox will encapsulate
 * @param  {String}   text          The string that will show information about the object
 * @param  {Function} lookCallback  A callback that will be called when you look at the trigger box
 * @param  {Function} clickCallback A callback that will be called when you press E while looking at the trigger box
 * @return {Null}                   null
 */
function addPointerTrigger(object, text, lookCallback = lookCallbackDefault, clickCallback = clickCallbackDefault) {
  //Calculate Bounding Box
  let collider = new Box3();
  collider.setFromObject(object);

  // Adds box wireframe for debug mode
  if(engine.DEBUG) {
    let boxHelper = new Box3Helper(collider, 0x00ff00);
    scene.add(boxHelper);
  }

  triggers.push({collider, text, lookCallback, clickCallback});
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
    if(event.keyCode === 69 && !eClicked) {
      eClicked = true;
      clickCallback();
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
