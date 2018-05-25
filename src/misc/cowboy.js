import { Matrix4, Vector3, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addLightingHandler } from "../utils/lightManager";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { wallSwitch } from "./switch";

let rotationRate = 0;

function cowboy() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/cowboy.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the cowboy
    let matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-140, 1, 0);
    obj.position.set(0, 11.4, 0);
    obj.rotation.set(0, Math.degToRad(90), 0);
    addCollider(ped);

    // let spotLight = addSpotlight(new Vector3(50, 40, 0));
    // ped.add(spotLight);
    //
    // //Add a key binding toggle the light. Bidns the light to key "1"
    // let lightID = addLightingHandler(49, spotLight);
    //
    // // wallSwitch(new Vector3(0, 8, 43), lightID);
    //
    // // engine.outlineObject(ped);// add Y rotation to the model

    let text = "TEST, right now you are looking at the cowboy";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    // //Trigger to turn the light on when entering the sphere
    // addTrigger(50, ped.position, () => {
    //   spotLight.intensity = 1;
    // }, 0);
    //
    // //Trigger to turn the light off when leaving the sphere
    // addTrigger(50, ped.position, () => {
    //   spotLight.intensity = 0;
    // }, 1);

    scene.add(ped);

    // add Y rotation to the model
    engine.addUpdate("CowboyUpdate", () => {
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
  // console.log("A clickCallback");
}

export {
  cowboy
};
