import { Matrix4, SpotLight, Math } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";

function samus() {

  let loader = new FBXLoader();
  detailedPedestal().then((ped) => {
    loader.load("models/GameCharacters/80s/Metroid/Samus.fbx", (obj) => {
      // Scale the samus
      let matrix = new Matrix4();
      matrix.makeScale(0.01, 0.01, 0.01);
      obj.applyMatrix(matrix);
      ped.add(obj);

      ped.position.set(-140, 1, -90);
      obj.position.set(2, 11.4, 3);
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

      // add Y rotation to the model
      addYRotation(obj);

      let text = "Name: Samus Aran<br> First Appearance: 1986<br> Model Date: <br> Description: <br>";
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
  samus
};
