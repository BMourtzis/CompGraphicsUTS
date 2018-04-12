import { WebGLRenderer } from 'three';

var renderer;

 const rendererSettings = {
  precision: "lowp"
 }

function init() {
  renderer = new WebGLRenderer(rendererSettings);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

init();

export {
  renderer
}
