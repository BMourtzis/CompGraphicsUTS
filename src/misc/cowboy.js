import { Matrix4 } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";

function Cowboy() {
  var loader = new FBXLoader();
  loader.load("models/cowboy.fbx", (obj) => {
    var matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);
    scene.add(obj);
  });
}

export {
  Cowboy
}
