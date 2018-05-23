import {Matrix4, TextureLoader, MeshPhongMaterial, BoxGeometry, Mesh, Vector3} from "three";
import {FBXLoader} from "../loaders/FBXLoader";
import {scene} from "../utils/engine";
import {addCollider} from "../utils/collider";


function room() {
  let loader = new FBXLoader();
  let textureLoader = new TextureLoader();
  let texture = textureLoader.load("textures/large_wood_wall_rotates.png");
  let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

  wall(material, new Vector3(40, 15, 0));

//left wall
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.33);
    backWall.applyMatrix(matrix);

    backWall.position.set(-150, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//right wall
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.33);
    backWall.applyMatrix(matrix);

    backWall.position.set(150, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//hall left
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.28);
    backWall.applyMatrix(matrix);

    backWall.position.set(-33.5, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//hall right
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.1, 0.28);
    backWall.applyMatrix(matrix);

    backWall.position.set(33.5, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//front wall R
  loader.load("models/WallLeftRight.fbx", (rightWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.13, 0.1, 0.1);
    //matrix.makeRotationY(degToRad(90));
    rightWall.applyMatrix(matrix);

    rightWall.position.set(90, 5, -270);

    rightWall.children[0].material = material;

    addCollider(rightWall);

    scene.add(rightWall);
  });

  //front wall L
  loader.load("models/WallLeftRight.fbx", (rightWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.13, 0.1, 0.1);
    //matrix.makeRotationY(degToRad(90));
    rightWall.applyMatrix(matrix);

    rightWall.position.set(-90, 5, -270);

    rightWall.children[0].material = material;

    addCollider(rightWall);

    scene.add(rightWall);
  });

//rear wall
  loader.load("models/WallLeftRight.fbx", (leftWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.33, 0.1, 0.1);
    //matrix.makeRotationY(degToRad(90));
    leftWall.applyMatrix(matrix);

    leftWall.position.set(0, 5, 30);

    leftWall.children[0].material = material;

    addCollider(leftWall);

    scene.add(leftWall);
  });
}

function wall(material, position, rotation) {
  let box = new BoxGeometry(0.001, 0.001, 0.001);
  let mesh = new Mesh(box, material);
  mesh.position.add(position);
  addCollider(mesh);
  scene.add(mesh);
}

export {
  room
};
