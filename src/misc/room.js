import { Matrix4, TextureLoader, MeshPhongMaterial, BoxGeometry, Mesh, Vector3 } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene, engine } from "../utils/engine";
import { addCollider } from "../utils/collider";


function room() {
  let loader = new FBXLoader();
  let textureLoader = new TextureLoader();
  let texture = textureLoader.load("textures/wall - resized.jpg");
  let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

  wall(material, new Vector3(40, 15, 0));

  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.1);
    backWall.applyMatrix(matrix);

    backWall.position.set(-50, 5, 0);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

  loader.load("models/WallLeftRight.fbx", (rightWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.1);
    //matrix.makeRotationY(degToRad(90));
    rightWall.applyMatrix(matrix);

    rightWall.position.set(-10, 5, -45);
    addCollider(rightWall);

    scene.add(rightWall);
  });

  loader.load("models/WallLeftRight.fbx", (leftWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.1);
    // matrix.makeRotationY(Math.degToRad(90));
    leftWall.applyMatrix(matrix);

    leftWall.position.set(-10, 5, 45);
    addCollider(leftWall);

    scene.add(leftWall);
  });
}

function wall(material, position = new Vector3(0, 0, 0), rotation = 0) {
  //Create geometry and mesh
  let box = new BoxGeometry(3, 30, 60);
  let mesh = new Mesh(box, material);

  //Apply translations
  mesh.position.add(position);
  let matrix = new Matrix4();
  matrix.makeRotationY(Math.degToRad(rotation));
  mesh.applyMatrix(matrix);

  //Add collider and add to the scene
  addCollider(mesh);
  scene.add(mesh);
}

export {
  room
};
