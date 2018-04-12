import { Cube } from "three";
import { engine, scene } from "./utils/engine"
// at the top we import all the files required
// remeber that you need to import objects from the engine module

// we write a function that acts as an initializer
function Example() {
  //create all the objects needed
  var cube = new Cube();
  //add the object to the scene
  scene.add(cube);
  // if you required to update the object
  // then you have to register your update functions
  engine.addUpdate("cubeUpdate", update);
}

//after you register your update function, the function will be called after on every update;
function update() {

}

//lastly you need to export you initializer functions
// so that it can be called
export {
  Example
}
