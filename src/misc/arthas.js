import { Matrix4, SpotLight, Math, Object3D } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";

function arthas() {
  let loader = new FBXLoader();
  detailedPedestal().then((real) => {
    loader.load("models/GameCharacters/2000s/WorldOfWarcraft/Arthas.fbx", (obj) => {
      let ped = new Object3D();
      ped.copy(real);

      // Scale the Ghost
      let matrix = new Matrix4();
      matrix.makeScale(0.0015, 0.0015, 0.0015);
      obj.applyMatrix(matrix);
      ped.add(obj);

      ped.position.set(-140, 1, -165);
      obj.position.set(1.5, 23, 0);
      obj.rotation.set(0, Math.degToRad(180), 0);
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

export {
  arthas
};
