import { Matrix4, SpotLight, Math } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider } from "../utils/collider";
import { complexPedestal } from "./pedestal";

function cowboy() {

  let loader = new FBXLoader();
  complexPedestal().then((ped) => {
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

      spotLight.position.set(50, 40, 0);
      // spotLight.rotation.set(Math.degToRad(60), 0, 0);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 40;
      spotLight.shadow.camera.fov = 30;

      scene.add(ped);
    });
  }, (err) => {
    console.log(err);
  });
}

export {
  cowboy
}
