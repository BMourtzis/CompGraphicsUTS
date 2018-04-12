import { PerspectiveCamera, Matrix4 } from "three";
import { pointerLockInit, controls, controlsEnabled } from "./utils/pointerLockControls";
import { SimpleFloor } from "./misc/floors";
import { SimpleScene } from "./utils/scene";
import { Cowboy } from "./misc/cowboy";
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
  Cowboy(scene);

  window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
  requestAnimationFrame(animate);
  if(controlsEnabled) {
    controls.animate();
  }
  renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
