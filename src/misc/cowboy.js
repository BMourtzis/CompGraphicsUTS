import { Matrix4 } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider } from "../utils/collider";

function cowboy() {

  let loader = new FBXLoader();
  loader.load("models/cowboy.fbx", (obj) => {
    // Scale the cowboy
    let matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);

    obj.position.set(-20, 1, 0);
    addCollider(obj);

    scene.add(obj);
  });
}

export {
  cowboy
}
