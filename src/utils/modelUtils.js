import { SpotLight, Math, Matrix4 } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { engine } from "../utils/engine";

/**
 * addSpotlight - Adds a new Spotilight to the position you want
 *
 * @param  {Vector3} position          The global postion of the spotLight
 * @param  {Number}  colour = 0xffffff The colour of the light. Defaults to white
 * @param  {Number}  intensity = 1     The intisity of the light from 0 to 1
 * @return {Null}                      null
 */

function addSpotlight(position, colour = 0xffffff, intensity = 1) {
  let spotLight = new SpotLight(colour, intensity);
  spotLight.intensity = 0;

  spotLight.position.set(position.x, position.y, position.z);

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 40;
  spotLight.shadow.camera.fov = 30;

  return spotLight;
}

/**
 * promisifyLoad - Creates a new FBXLoader and loads a models as Promise
 *
 * @param  {String} url   The location of the model
 * @return {Object3D}     The model loaded by the loader
 */
function promisifyLoad(url) {
  let loader = new FBXLoader();
  let promise = new Promise((resolve, reject) => {
    loader.load(url, (obj) => {
      resolve(obj);
    }, () => { return null; }, (err) => {
      reject(err);
    });
  });

  return promise;
}

/**
 * addYRotation - Add Y rotation to the model
 *
 * @param  {Object3D} model            The model to be rotated
 * @param  {Number}   rotationRate = 1 A rotation modifier, 1 is normal speed anti-clockwise, -1 is normal clockwise
 * @return {Null}                      null
 */
function addYRotation(model, rotationRate = 1) {
  let rotation = Math.degToRad(10) * engine.Delta * rotationRate;
  let rotationMatrix = new Matrix4();
  rotationMatrix.makeRotationY(rotation);
  model.applyMatrix(rotationMatrix);
}

export {
  addSpotlight,
  promisifyLoad,
  addYRotation
};
