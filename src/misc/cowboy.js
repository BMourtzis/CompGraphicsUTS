import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";

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

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    // engine.outlineObject(ped);// add Y rotation to the model

    let text = [
    "mario",
    "Name: The Cowboy<br> First Appearance: 2018<br> Model Date: 2016<br> Description: Test Model for the Virtual Museum<br>"
    ];
    let modelId = "cowboy";
    addPointerTrigger(ped, text, lookCallback, clickCallback, modelId);

    //Trigger to turn the light on when entering the sphere
    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    //Trigger to turn the light off when leaving the sphere
    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

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
