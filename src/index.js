import { PerspectiveCamera } from "three";
import { pointerLockInit, controls, controlsEnabled } from "./utils/pointerLockControls";
import { SimpleFloor } from "./misc/floors";
import { SimpleScene } from "./utils/scene";
import { renderer } from './utils/renderer';
import { FBXLoader } from './loaders/FBXLoader';

var camera, scene;

init();
animate();

function init() {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene = new SimpleScene();

  pointerLockInit(camera);
  scene.add(controls.getObject());
  scene.add(SimpleFloor());
  var loader = new FBXLoader();
  loader.load("models/CoffeMug.fbx", (obj) => {
    scene.add(obj);
  });
}

function animate() {
  requestAnimationFrame(animate);
  if(controlsEnabled) {
    controls.animate();
  }
  renderer.render(scene, camera);
}
