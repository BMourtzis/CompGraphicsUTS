import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";
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

    ped.position.set(-40, 1, -165);
    obj.position.set(0, 11.4, 0);
    obj.rotation.set(0, Math.degToRad(180), 0);
    addCollider(ped);

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    let text = [
    "chief",
    "Name: Master Chief<br> First Appearance: 2001<br> Model Date: 2007<br> Description: Protagonist of the Halo series<br>"
    ];
    let modelId = "chief";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

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
