import { BoxGeometry } from "three";
import { engine, scene } from "./utils/engine"
// at the top we import all the files required
// remeber that you need to import objects from the engine module

// we write a function that acts as an initializer
function Example() {
  //create all the objects needed
  var geometry = new BoxGeometry(1, 1, 1);

  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );

  //add the object to the scene
  scene.add(cube);
  // if you required to update the object
  // then you have to register your update functions
  engine.addUpdate("cubeUpdate", () => { // this is an inline function
    //after you register your update function, the function will be called after on every update;
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });
}

// if you want to have a separate function for the update,
// you need to create a property outside of the function
var cowboy;

function LoaderExample() {
  var loader = new FBXLoader();
  loader.load("models/cowboy.fbx", (obj) => {
    var matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);
    obj.position.set(1, 1, 1);
    scene.add(obj);
    engine.addUpdate("cowboyUpdate", () => {
      // udpate the model
    }));
  });
}

//lastly you need to export you initializer functions
// so that it can be called
export {
  Example,
  LoaderExample
}
