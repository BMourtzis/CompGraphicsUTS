import { Object3D, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import { scene, engine } from "./engine";

function TestCollder() {
  var parent = new Object3D();

  var geometry = new BoxGeometry( 5, 5, 5 );
  var material = new MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new Mesh( geometry, material );
  parent.position.set(15, 10, 0);
  parent.add(cube);
  scene.add(parent);
}

export {
  TestCollder
}
