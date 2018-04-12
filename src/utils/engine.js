import {
  //Cameras
  PerspectiveCamera,
  //Light
  HemisphereLight, AmbientLight,
  //Misc
  Scene, Color, Fog, WebGLRenderer } from "three";

var renderer, camera, scene;

//list of update objects, includes update functions
var updateList = [];

const rendererSettings = {
 precision: "lowp"
}

var engine = {
  // initalizer of the "engine", creates a new camera, scene with fog and the renderer
  //TODO: add some parameters to customise some of the initializatio
  init() {
    // Create the camera
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    // Create the scene
    scene = new Scene();
    scene.background = new Color(0xffffff);
    scene.fog = new Fog(0xffffff, 0, 750);

    // Add a new light to the scene
    var henmiLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
    henmiLight.position.set(0.5, 1, 0.75);
    scene.add(henmiLight);

    // Craete a WebGLRenderer
    renderer = new WebGLRenderer(rendererSettings);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Add a callback for the resize event`
    window.addEventListener( 'resize', onWindowResize, false );

    //Call the update function
    //This will create an update loop
    update();
  },
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
  requestAnimationFrame(update);
  for(let update of updateList) {
    update.fn();
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
