import { Matrix4, TextureLoader, MeshPhongMaterial, BoxGeometry, Mesh, Vector3, Math } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider } from "../utils/collider";


function room() {
  let loader = new FBXLoader();
  let textureLoader = new TextureLoader();
  let texture = textureLoader.load("textures/large_wood_wall_rotates.png");
  let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

  wall(material, new Vector3(40, 15, 0), 0);

//left wall
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.2, 0.33);
    backWall.applyMatrix(matrix);

    backWall.position.set(-150, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//right wall
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.2, 0.33);
    backWall.applyMatrix(matrix);

    backWall.position.set(150, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//hall left
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.2, 0.28);
    backWall.applyMatrix(matrix);

    backWall.position.set(-33.5, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//hall right
  loader.load("models/wall.fbx", (backWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.1, 0.2, 0.28);
    backWall.applyMatrix(matrix);

    backWall.position.set(33.5, 5, -120);

    backWall.children[0].material = material;

    addCollider(backWall);

    scene.add(backWall);
  });

//front wall R
  loader.load("models/WallLeftRight.fbx", (rightWall) => {
    let matrix = new Matrix4();
    matrix.makeScale(0.13, 0.2, 0.1);
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
    matrix.makeScale(0.13, 0.2, 0.1);
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
    matrix.makeScale(0.33, 0.2, 0.1);
    //matrix.makeRotationY(degToRad(90));
    leftWall.applyMatrix(matrix);

    leftWall.position.set(0, 5, 30);

    leftWall.children[0].material = material;

    addCollider(leftWall);

    scene.add(leftWall);
  });
}

function generateWalls() {
  let textureLoader = new TextureLoader();
  let texture = textureLoader.load("textures/large_wood_wall_rotates.png");
  let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

  for(let item of wallList) {
    wall(material, item.position, item.rotation, item.width);
  }
}

function wall(material, position = new Vector3(0, 0, 0), rotation = 0, width = 20) {
  //Create geometry and mesh
  let box = new BoxGeometry(4, 100, width);
  let mesh = new Mesh(box, material);

  //Apply translations
  mesh.position.add(position);
  mesh.rotation.y = Math.degToRad(rotation);

  //Add collider and add to the scene
  addCollider(mesh);
  scene.add(mesh);
}

const wallList = [
  {position: new Vector3(-150, 5, -120), rotation: 0, width: 300},
  {position: new Vector3(150, 5, -120), rotation: 0, width: 300},
  {position: new Vector3(-33.5, 5, -120), rotation: 0, width: 200},
  {position: new Vector3(33.5, 5, -120), rotation: 0, width: 200},
  {position: new Vector3(90, 5, -270), rotation: 90, width: 120},
  {position: new Vector3(-90, 5, -270), rotation: 90, width: 120},
  {position: new Vector3(0, 5, 30), rotation: 90, width: 300}
];

export {
  room,
  generateWalls
};
