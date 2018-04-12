import { PlaneGeometry, Color, MeshBasicMaterial, Mesh, VertexColors } from "three";
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

}

export {
  SimpleFloor
}
