import { PlaneGeometry, Color, MeshBasicMaterial, Mesh, VertexColors, MeshPhongMaterial, GridHelper, SpotLight } from "three";
import { scene } from "../utils/engine";

function SimpleFloor() {
  var floorGeometry = new PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);

  for (var i = 0, l = floorGeometry.vertices.length; i < l; i++) {
    var vertex = floorGeometry.vertices[i];
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;
  }

  for (var i = 0, l = floorGeometry.faces.length; i < l; i++) {
    var face = floorGeometry.faces[i];
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
  }

  var floorMaterial = new MeshBasicMaterial({ vertexColors: VertexColors });
  var floor = new Mesh(floorGeometry, floorMaterial);

  scene.add(floor);
}

function GridFloor() {
  var floor = new Mesh(new PlaneGeometry(2000, 2000), new MeshPhongMaterial({color: 0xffffff, deptWrite: false}));
  floor.rotation.x = -Math.PI/2;
  floor.receiveShadow = true;

  var grid = new GridHelper(2000, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;

  scene.add(floor);
  scene.add(grid);

  //Playing with some lighting.
  // Should remove later
  var spotLight = new SpotLight( 0xffffff );
  spotLight.position.set( 10, 10, 0 );

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  scene.add(spotLight);
}

export {
  SimpleFloor,
  GridFloor
}
