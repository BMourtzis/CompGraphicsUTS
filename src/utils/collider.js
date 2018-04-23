import { Vector3, Vector2, Raycaster, Box3, Box3Helper } from "three";
import { scene, camera, engine } from "./engine";

/**
 * The collider of the player
 */
let playerCollider;

/**
 * A list of all the colliders registered
 */
let colliders = [];

/**
 * addCollider - Adds a new collider based on the Object3D given
 *
 * @param  {Object3D} object         The Object3D that the collider will ecnapsualte
 * @param  {Function} updateFunction An update function for the collider
 * @return {Box3}                    The collider generated
 */
function addCollider(object, updateFunction) {
  let box = new Box3();
  //Calculate Bounding Box
  box.setFromObject(object);

  // Adds box wireframe for debug mode
  if(engine.DEBUG) {
    let boxHelper = new Box3Helper(box, 0xff0000);
    scene.add(boxHelper);
  }

  colliders.push(box);

  if(updateFunction) {
    engine.addUpdate("colliderUpdate", updateFunction);
  }

  return box;
}

/**
 * addCustomCollider - Creates a new collider with custom dimensions
 *
 * @param  {Vector3} centerPoint The center of the new collider
 * @param  {Number} width        X axis
 * @param  {Number} height       Y axis
 * @param  {Number} depth        z axis
 * @return {Null}                null
 */
function addCustomCollider(centerPoint = new Vector3(), width, height, depth) {
  let box = new Box3();

  let size = new Vector3(width, height, depth);

  box.setFromCenterAndSize(centerPoint, size);

  if(engine.DEBUG) {
    // Adds box wireframe for debug
    let newHelper = new Box3Helper(box, 0xff0000);
    scene.add(newHelper);
  }

  colliders.push(box);
}

/**
 * addPlayerCollider - Add a collider ot the player
 *
 * @return {Box3}  Returns the player collider
 */
function addPlayerCollider() {
  playerCollider = new Box3();

  //TODO: makes these into parameters
  let center = new Vector3(0, 9, 0);
  let size = new Vector3(5, 12, 5);

  playerCollider.setFromCenterAndSize(center, size);

  if(engine.DEBUG) {
    // Adds box wireframe for debug
    let newHelper = new Box3Helper(playerCollider, 0x0000ff);
    scene.add(newHelper);
  }

  return playerCollider;
}


/**
 * resetPlayerPosition - Resets the collider to 0,0,0 then translates using the vector
 *
 * @param  {Vector3} vector The velocity to the colllider after reset
 * @return {Null}           null
 */
function resetPlayerPosition(vector = new Vector3()) {
  // Move the collider to position 0,0,0
  let resetVector = new Vector3(-playerCollider.min.x, -playerCollider.min.y, -playerCollider.min.z)
  playerCollider.translate(resetVector);

  // Then apply the new velocity
  playerCollider.translate(vector);
}

/**
 * updatePlayerCollider - Updates the player's collider box
 *
 * @param  {Vector3} vector The velocity vector
 * @return {Null}           null
 */
function updatePlayerCollider(vector) {
  playerCollider.translate(vector);
}

/**
 * validateMovement - Validates the movements vector based on the colliders
 *
 * @param  {Vector3} initVector The Movement Vector
 * @return {Vector3}            The Vector resulted from the collisions
 */
function validateMovement(initVector) {
  // NOTE: might not need that
  let resultVector = initVector.clone();
  let box = playerCollider.clone();
  // Moves the colider with the movement vector
  box.translate(resultVector);

  // checks all the registered coliders to see how to negate movement
  for(let collider of colliders) {
    if(box.intersectsBox(collider)) {
      resultVector = negateCollisionAxis(resultVector, collider);
    }
  }

  return resultVector;
}


/**
 * negateCollisionAxis - Checks the movement on each axis and negates the ones that cause the collision
 *
 * @param  {Vector3} vector      Movement Vector
 * @param  {Box3}    collidedBox The collider the collision was detected
 * @return {Vector3}             The result vector
 */
function negateCollisionAxis(vector, collidedBox) {
  let resultVector = new Vector3();
  // a list of axis
  let axis = ["x", "y", "z"];

  for(let pos of axis) {
    //Create the new Vector3 and assign the velocity
    let newVector = new Vector3();
    newVector[pos] = vector[pos];

    // Clone the box and translate
    let box = playerCollider.clone();
    box.translate(newVector);

    // check if collision. If not, get the velocity
    if(!box.intersectsBox(collidedBox)) {
      resultVector[pos] = newVector[pos];
    }
  }

  return resultVector;
}


// old code used to test rays and intersections
// Left as an example of how to use raycasters
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
  addCustomCollider,
  validateMovement,
  addPlayerCollider,
  updatePlayerCollider,
  resetPlayerPosition
};
