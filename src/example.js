import { BoxGeometry, MeshBasicMaterial, Mesh, Matrix4, Vector3 } from "three";
import { engine, scene } from "./utils/engine";
import { FBXLoader } from "./loaders/FBXLoader";
import { addTrigger } from "./utils/colliders";
// at the top we import all the files required
// remeber that you need to import objects from the engine module

// we write a function that acts as an initializer
function Example() {
  //create all the objects needed
  let geometry = new BoxGeometry(1, 1, 1);

  let material = new MeshBasicMaterial({color: 0x00ff00});
  let cube = new Mesh( geometry, material );

  //add the object to the scene
  scene.add(cube);
  // if you required to update the object
  // then you have to register your update function
  engine.addUpdate("cubeUpdate", () => { // this is an inline function
    //after you register your update function, the function will be called on every update;
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });
}

function LoaderExample() {
  let loader = new FBXLoader();
  // the load function is asynchronous because it takes time to load the models
  // so when the model is done loading it will call the callback function
  loader.load("models/cowboy.fbx", (obj) => { // this is the callback function
    // an example of what you can do once you have the model
    let matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);

    obj.applyMatrix(matrix);
    obj.position.set(1, 1, 1);

    scene.add(obj);

    //register an update function
    engine.addUpdate("cowboyUpdate", () => {
      // your update function
    });
  });
}

function TriggerExample() {
  // Creates a new trigger that will be actived when the player wakes into them.
  // The first paramater is the radius of the Sphere
  // The second parameter is the position of the center of the Sphere
  // The third parameter is the event function, that is called when the trigger is activated
  // Lastly, the fourth parameter is the type of trigger. 0: OnEnter, 1: OnLeave, 2: OnStay
  addTrigger(5, new Vector3(-20, 1, 0), () => {
    console.log("triggered!");
  }, 0);
}

//lastly you need to export you initializer functions
//so that they can be called
export {
  Example,
  LoaderExample,
  TriggerExample
};
