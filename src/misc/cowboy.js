import { Matrix4, SpotLight, Math } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene, engine } from "../utils/engine";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";

function cowboy() {

  let loader = new FBXLoader();
  detailedPedestal().then((ped) => {
    loader.load("models/cowboy.fbx", (obj) => {
      // Scale the cowboy
      let matrix = new Matrix4();
      matrix.makeScale(0.01, 0.01, 0.01);
      obj.applyMatrix(matrix);
      ped.add(obj);

      ped.position.set(-20, 1, 0);
      obj.position.set(0, 11.4, 0);
      obj.rotation.set(0, Math.degToRad(90), 0);
      addCollider(ped);

      let spotLight = new SpotLight(0xffffff, 0.5);
      ped.add(spotLight);
      spotLight.intensity = 0;

      spotLight.position.set(50, 40, 0);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 40;
      spotLight.shadow.camera.fov = 30;

      engine.changeOutlinedObject(ped);

      // add Y rotation to the model
      engine.addUpdate("cowboyUpdate", () => {
        let rotation = Math.degToRad(10) * engine.Delta;
        let rotationMatrix = new Matrix4();
        rotationMatrix.makeRotationY(rotation);
        obj.applyMatrix(rotationMatrix);
      });

      addPointerTrigger(ped, "this is a test", lookCallback, clickCallback);

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
  console.log("A lookCallback");
}

function clickCallback() {
  console.log("A clickCallback");
}

export {
  cowboy
};
