import { PlaneGeometry, Color, MeshBasicMaterial, Mesh, VertexColors, MeshPhongMaterial, GridHelper } from "three";
import { scene } from "../utils/engine";
import { addCollider } from "../utils/collider";


/**
 * simpleFloor - Creates a colourful floor. The colours are generates randomly.
 *
 * @return {Null}  null
 */
function simpleFloor() {
  let floorGeometry = new PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);

  for (let i = 0, w = floorGeometry.vertices.length; i < w; i++) {
    let vertex = floorGeometry.vertices[i];
    vertex.x += (Math.random() * 20) - 10;
    vertex.y += Math.random() * 2;
    vertex.z += (Math.random() * 20) - 10;
  }

  for (let j = 0, w = floorGeometry.faces.length; j < w; j++) {
    let face = floorGeometry.faces[j];
    face.vertexColors[0] = new Color().setHSL((Math.random() * 0.3) + 0.5, 0.75, (Math.random() * 0.25) + 0.75);
    face.vertexColors[1] = new Color().setHSL((Math.random() * 0.3) + 0.5, 0.75, (Math.random() * 0.25) + 0.75);
    face.vertexColors[2] = new Color().setHSL((Math.random() * 0.3) + 0.5, 0.75, (Math.random() * 0.25) + 0.75);
  }

  let floorMaterial = new MeshBasicMaterial({ vertexColors: VertexColors });
  let floor = new Mesh(floorGeometry, floorMaterial);

  scene.add(floor);
}


/**
 * gridFloor - Creates a simple floor with grid on top of it
 *
 * @return {Null}  null
 */
function gridFloor() {
  // The floor without grid
  let floor = new Mesh(new PlaneGeometry(2000, 2000), new MeshPhongMaterial({color: 0xffffff, deptWrite: false}));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  // The GridHelpers adds a grid on y = 0;
  let grid = new GridHelper(2000, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;

  addCollider(floor);

  scene.add(floor);
  scene.add(grid);
}

export {
  simpleFloor,
  gridFloor
};
