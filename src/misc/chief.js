import { Matrix4, Vector3, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function chief() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/GameCharacters/2000s/Halo/chief.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the chief
    let matrix = new Matrix4();
    matrix.makeScale(0.005, 0.005, 0.005);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-140, 1, -15);
    obj.position.set(0, 11.4, 0);
    obj.rotation.set(0, Math.degToRad(0), 0);
    addCollider(ped);

    // let spotLight = addSpotlight(new Vector3(50, 40, 0));
    // ped.add(spotLight);
    //
    // //Add a key binding toggle the light. Bidns the light to key "1"
    // let lightID = addLightingHandler(49, spotLight);

    let text = "TEST, right now you are looking at the cowboy";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    // addTrigger(50, ped.position, () => {
    //   spotLight.intensity = 1;
    // }, 0);
    //
    // addTrigger(50, ped.position, () => {
    //   spotLight.intensity = 0;
    // }, 1);

    scene.add(ped);

    // add Y rotation to the model
    engine.addUpdate("ChiefUpdate", () => {
      if(rotationRate !== 0) {
        addYRotation(obj, rotationRate);
        rotationRate = 0;
      }
    });
  }, (err) => {
    console.log(err);
  });
}

function lookCallback() {
  rotationRate = 1;
}

function clickCallback() {
  //Does nothing
}

export {
  chief
};
