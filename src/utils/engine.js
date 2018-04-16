import {
  //Cameras
  PerspectiveCamera,
  //Light
  HemisphereLight,
  //Misc
  Scene, Color, Fog, WebGLRenderer, Clock} from "three";

let renderer, camera, scene, clock;

// Used to keep track of the ms between frames
let delta = 0;

// whether or not, the system is in debug mode
let DEBUG = false;

//List of update objects, includes update functions
let updateList = [];

const rendererSettings = {
 precision: "lowp"
}

let engine = {
  // initalizer of the "engine", creates a new camera, scene with fog and the renderer
  //TODO: add some parameters to customise some of the initialization
  init(debug = false) {
    DEBUG = debug;
    // Create the camera
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    //Clock
    clock = new Clock();

    // Create the scene
    scene = new Scene();
    scene.background = new Color(0xffffff);
    scene.fog = new Fog(0xffffff, 0, 750);

    // Add a new light to the scene
    let henmiLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
    henmiLight.position.set(0.5, 1, 0.75);
    scene.add(henmiLight);

    // Craete a WebGLRenderer
    renderer = new WebGLRenderer(rendererSettings);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Add a callback for the resize event`
    window.addEventListener( 'resize', onWindowResize, false );

    //Call the update function. It will create an update loop
    update();
  },
  //Returns the delta for the frame
  getDelta() { return delta; },
  //adds the update function to the update loop
  addUpdate(updateName, updateFn) {
    updateList.push({name: updateName, fn: updateFn });
  },
  //Removes an update functions
  removeUpdate() {
    //TODO: find a way to call this function when an object is removed from the scene
  }
}

//Updates the scene and then rerenders
//It goes through all the update functions registered
function update() {
  //Add the update function to be called on the next frame
  requestAnimationFrame(update);

  //Set the new delta
  delta = clock.getDelta();

  //Call all the registered updates
  for(let update of updateList) {
    update.fn(DEBUG);
  }
  renderer.render(scene, camera);
}

//Resize callback function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

export {
  engine,
  camera,
  scene,
  renderer
}
