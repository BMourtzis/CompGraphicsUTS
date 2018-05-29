import { Matrix4, TextureLoader, MeshPhongMaterial, BoxGeometry, Mesh, Vector3, Math, SpotLightHelper, Object3D } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { engine, scene } from "../utils/engine";
import { addCollider } from "../utils/collider";
import { promisifyLoad, addSpotlight } from "../utils/modelUtils";
import { addLightingHandler } from "../utils/lightManager";
import { wallSwitch } from "./switch";

function room() {
  let loader = new FBXLoader();
  let textureLoader = new TextureLoader();
  let texture = textureLoader.load("textures/large_wood_wall_rotates.png");
  let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

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
  return promisifyLoad("textures/large_wood_wall.png", new TextureLoader()).then((texture) => {
    let material = new MeshPhongMaterial({ map: texture, overdraw: 0.5});

    for(let item of wallList) {
      wall(material, item.position, item.rotation, item.width);
    }

    addLights();
  });
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

function addLights() {
  for(let item of lightList) {
    let ids = [];

    for(let position of item.lights) {
      let spotlight = addSpotlight(position, 20, 0);

      if(engine.DEBUG) {
        let spotLightHelper = new SpotLightHelper(spotlight);
        scene.add(spotLightHelper);
      }

      let newPosition = new Vector3();
      newPosition.copy(position);
      newPosition.add(new Vector3(0, -30, 0));

      let obj = new Object3D();
      obj.position.set(newPosition.x, newPosition.y, newPosition.z);

      scene.add(obj);

      spotlight.target = obj;

      //Add a key binding toggle the light.
      ids.push(addLightingHandler(item.key, spotlight, 0.1));

      scene.add(spotlight);
    }

    wallSwitch(item.switchPos, item.key);
  }
}

const lightList = [
  {key: 49, lights: [
    new Vector3(-80, 50, -20),
    new Vector3(-80, 50, -140),
    new Vector3(-80, 50, -250)
  ], switchPos: new Vector3(-50, 10, 28)},
  {key: 50, lights: [
    new Vector3(0, 50, -20),
    new Vector3(0, 50, -140),
    new Vector3(0, 50, -250)
  ], switchPos: new Vector3(0, 10, 28)},
  {key: 51, lights: [
    new Vector3(80, 50, -20),
    new Vector3(80, 50, -140),
    new Vector3(80, 50, -250)
  ], switchPos: new Vector3(50, 10, 28)}
];

export {
  room,
  generateWalls
};
