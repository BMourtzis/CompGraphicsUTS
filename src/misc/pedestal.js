import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";

function complexPedestal() {
  let loader = new FBXLoader();
  loader.load("models/ET_Pedestal.fbx", (obj) => {
    obj.position.set(20, 1, 0);
    scene.add(obj);
  });
}

export {
  complexPedestal
};
