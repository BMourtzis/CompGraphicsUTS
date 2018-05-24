import { Matrix4, SpotLight, Math, Object3D } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { engine, scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { addPointerTrigger } from "../utils/pointerTrigger";

let rotationRate = 0;

function snake() {
  let loader = new FBXLoader();
  detailedPedestal().then((real) => {
    loader.load("models/GameCharacters/80s/MetalGear/SolidSnake.fbx", (obj) => {
      let ped = new Object3D();
      ped.copy(real);

      // Scale the snake
      let matrix = new Matrix4();
      matrix.makeScale(0.008, 0.008, 0.008);
      obj.applyMatrix(matrix);
      ped.add(obj);

      ped.position.set(-140, 1, -45);
      obj.position.set(0, 11.4, 0);
      obj.rotation.set(0, Math.degToRad(90), 0);
      addCollider(ped);

      let spotLight = new SpotLight(0xffffff, 0.5);
      //ped.add(spotLight);
      spotLight.intensity = 0;

      spotLight.position.set(50, 40, 0);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 40;
      spotLight.shadow.camera.fov = 30;

      addTrigger(50, ped.position, () => {
        spotLight.intensity = 1;
      }, 0);

      addTrigger(50, ped.position, () => {
        spotLight.intensity = 0;
      }, 1);

      scene.add(ped);

      let text = "TEST, right now you are looking at the cowboy";
      addPointerTrigger(ped, text, lookCallback, clickCallback);

      // add Y rotation to the model
      engine.addUpdate("CowboyUpdate", () => {
        if(rotationRate !== 0) {
          addYRotation(obj, rotationRate);
          rotationRate = 0;
        }
      });
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
