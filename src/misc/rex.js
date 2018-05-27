import { Matrix4, SpotLight, Math, Object3D } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
<<<<<<< HEAD
=======
import { addPointerTrigger } from "../utils/pointerTrigger";
>>>>>>> nelson-Test-Branch
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";

function rex() {

  let loader = new FBXLoader();
  detailedPedestal().then((real) => {
    loader.load("models/GameCharacters/80s/MetalGear/Rex.fbx", (obj) => {
      let ped = new Object3D();
      ped.copy(real);

      // Scale the rex
      let matrix = new Matrix4();
      matrix.makeScale(0.005, 0.005, 0.005);
      obj.applyMatrix(matrix);
      ped.add(obj);

      ped.position.set(-140, 1, -30);
      obj.position.set(0, 11.4, 0);
      obj.rotation.set(0, Math.degToRad(0), 0);
      addCollider(ped);

      addYRotation(obj);

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

      // add Y rotation to the model
      addYRotation(obj);

      let text = "Name: Rex<br> First Appearance: <br> Model Date: <br> Description: <br>";
      addPointerTrigger(ped, text, lookCallback, clickCallback);

      addTrigger(50, ped.position, () => {
        spotLight.intensity = 1;
      }, 0);

      addTrigger(50, ped.position, () => {
        spotLight.intensity = 0;
      }, 1);

      scene.add(ped);
    });
  }, (err) => {
    console.log(err);
  });
}

function lookCallback() {
  // console.log("A lookCallback");
}

function clickCallback() {
  // console.log("A clickCallback");
}

export {
  rex
};
