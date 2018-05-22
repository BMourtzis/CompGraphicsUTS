import { Ray, Box3, Box3Helper, Vector3 } from "three";
import { engine, scene } from "./engine";
import { controls } from "./pointerLockControls";


/**
 * The max distance that the ray can intersect colliders
 */
const maxIntersectDistance = 20;

/**
 * The list with all the triggers registered
 */
let triggers = [];

/**
 * A boolean that says whether or not e is clicked
 */
let eClicked = false;


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
  addMoveEvents();
  let position = new Vector3();
  let direction = new Vector3();
  let intersectList = [];
  let ray = new Ray(position, direction);

  engine.addUpdate("pointerTriggerUpdate", () => {
    // Set the new origin of the cameraControls and its direction.

    controls.getPosition(position);
    controls.getDirection(direction);
    //NOTE: throws a warning to use at.
    ray.set(position, direction);

    // Loops through the triggers and finds the ones that it intersects
    for(let index in triggers) {
      let vector = ray.intersectBox(triggers[index].collider);
      // if it intersects it then check the distnace,
      // if lower than the max distance allowed then add it to the list
      if(vector !== null) {
        let distance = position.distanceTo(vector);
        if(distance < maxIntersectDistance) {
          intersectList.push({distance, index });
        }
      }
    }

    // used to find the closest interesect object
    let min = maxIntersectDistance;
    // used to get the closest interesect object
    let closestIndex = -1;

    //Find the closest object
    for(let intersect of intersectList) {
      if(intersect.distance < min) {
        min = intersect.distance;
        closestIndex = intersect.index;
      }
    }

    //Empty list for the next frame
    intersectList = [];

    // If there is a closest intersect object, then set text, call lookCallback
    // and assign the clickCallback
    if(closestIndex !== -1) {
      // TODO: @Nelson put the text to the UI, instead of a console log
      // console.log(triggers[closestIndex].text);
      triggers[closestIndex].lookCallback();
      clickCallback = triggers[closestIndex].clickCallback;
    }
    else {
      clickCallback = clickCallbackDefault;
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
