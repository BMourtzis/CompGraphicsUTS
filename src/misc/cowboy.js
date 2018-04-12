import { Matrix4, AnimationMixer, Clock } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { engine, scene } from "../utils/engine";

var clock = new Clock();

function Cowboy() {
  var loader = new FBXLoader();
  loader.load("models/cowboy.fbx", (obj) => {
    // Scale the cowboy
    var matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);

    // obj.position.set(0,1,0);

    scene.add(obj);

    // engine.addUpdate("cowboyUpdate", () => {
    //
    // });
  });
}

export {
  Cowboy
}
