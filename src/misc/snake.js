import { Matrix4, Math, Object3D } from "three";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlightTop, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function snake() {
  return Promise.all([
    detailedPedestal(),
    promisifyLoad("models/GameCharacters/80s/MetalGear/SolidSnake.fbx")
  ]).then(([real, obj]) => {
    let ped = new Object3D();
    ped.copy(real);

    // Scale the snake
    let matrix = new Matrix4();
    matrix.makeScale(0.008, 0.008, 0.008);
    obj.applyMatrix(matrix);
    ped.add(obj);

    ped.position.set(-40, 1, -45);
    obj.position.set(0, 11.4, 0);
    obj.rotation.set(0, Math.degToRad(-90), 0);
    addCollider(ped);

    scene.add(ped);

    let spotLight = addSpotlightTop(ped.position);
    spotLight.target = ped;

    scene.add(spotLight);

    let text = "Name: Solid Snake<br> First Appearance: 1987<br> Model Date: 2004 <br> Description: Solid Snake, the main character of Metal Gear 1/2 and Metal Gear Solid 1/4<br>";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0.5;
    }, 0);

    addTrigger(40, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

    // add Y rotation to the model
    engine.addUpdate("SolidSnakeUpdate", () => {
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
  snake
};
