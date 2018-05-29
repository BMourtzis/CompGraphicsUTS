import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function laraCroft() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/GameCharacters/90s/TombRaider/LaraCroft.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the Lara
    let matrix = new Matrix4();
    matrix.makeScale(30, 30, 30);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-40, 1, -105);
    obj.position.set(-7.8, 18, 0);
    obj.rotation.set(0, Math.degToRad(90), 0);
    addCollider(ped);

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    let text = "Name: Lara Croft<br> First Appearance: 1996<br> Model Date: <br> Description: <br>";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

    // add Y rotation to the model
    engine.addUpdate("laraCroftUpdate", () => {
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
  laraCroft
};
