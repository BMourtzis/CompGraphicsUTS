import { Vector3, Raycaster, MeshBasicMaterial, Mesh, WebGLRenderer, Vertexolors, PerspectiveCamera } from "three";
import { pointerLockInit, controls, controlsEnabled } from "./utils/pointerLockControls";
import { SimpleFloor } from "./misc/floors";
import { SimpleScene } from "./utils/scene";

var camera, scene, renderer;

init();
animate();

function init() {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene = new SimpleScene();

  pointerLockInit(camera);
  scene.add(controls.getObject());
  scene.add(SimpleFloor());

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  if(controlsEnabled) {
    controls.animate();

  }
  renderer.render(scene, camera);
}
