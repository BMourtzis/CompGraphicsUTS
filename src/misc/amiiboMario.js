import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function AmiiboMario() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/GameCharacters/80s/Mario/AmiiboMario.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the mario
    let matrix = new Matrix4();
    matrix.makeScale(0.001, 0.001, 0.001);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-40, 1, -75);
    obj.position.set(0, 15.5, 0);
    obj.rotation.set(0, Math.degToRad(45), 0);
    addCollider(ped);

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    let text = "Name: 3D Mario<br> First Appearance: 1981<br> Model Date: 2015<br> Description: Model of the Mario Amiibo<br>";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

    // add Y rotation to the model
    engine.addUpdate("amiiboMarioUpdate", () => {
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
  //does nothing
}

export {
  AmiiboMario
};
