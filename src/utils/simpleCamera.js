import { PerspectiveCamera } from 'three';

function init() {
  var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export default init;
