import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function dragonborn() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/GameCharacters/2000s/Skyrim/DragonBorn.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the Ghost
    let matrix = new Matrix4();
    matrix.makeScale(0.002, 0.002, 0.002);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-140, 1, -150);
    obj.position.set(0, 11.4, 0);
    obj.rotation.set(0, Math.degToRad(-90), 0);
    addCollider(ped);

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    let text = [
    "dragonborn",
    "Name: Dragon Born<br> First Appearance: 2011<br> Model Date: 2011<br> Description: Protagonist of The Elder Scrolls V: Skyrim<br>"
    ];
    let modelId = "dragonborn";
    addPointerTrigger(ped, text, lookCallback, clickCallback);


    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

    // add Y rotation to the model
    engine.addUpdate("DragonBornUpdate", () => {
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
  dragonborn
};
