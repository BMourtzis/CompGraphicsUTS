import {
  //Cameras
  PerspectiveCamera,
  //Light
  HemisphereLight,
  //Misc
  Scene, Color, Fog, WebGLRenderer, Clock, Vector2, TextureLoader, RepeatWrapping } from "three";
import { EffectComposer } from "./postprocessing/effectComposer";
import { RenderPass } from "./postprocessing/renderPass";
import { OutlinePass } from "./postprocessing/outlinePass";
import { ShaderPass} from "./postprocessing/shaderPass";
import { FXAAShader } from "./postprocessing/FXAAShader";

let renderer, camera, scene, clock;

let composer, outlinePass, renderPass, effectFXAA;

// Used to keep track of the ms between frames
let delta = 0;

// whether or not, the system is in debug mode
let DEBUG = false;

//List of update objects, includes update functions
let updateList = [];

//Renderer settings used by the WebGLRenderer
const rendererSettings = {
 precision: "lowp"
};

let engine = {
  //TODO: add some parameters to customise some of the initialization
  /**
   * init - Intializes the engine, incles camera, lights, renderer and the update loop
   *
   * @param  {boolean} debug = false Whether or not the engine is in debug mode. Default is false.
   * @return {null}                  null`
   */
  init(debug = false) {
    DEBUG = debug;
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    clock = new Clock();

    // Create the scene, with background and fog
    scene = new Scene();
    scene.background = new Color(0xffffff);
    scene.fog = new Fog(0xffffff, 0, 750);

    // Add a new light to the scene
    let henmiLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
    henmiLight.position.set(0.5, 1, 0.75);
    scene.add(henmiLight);

    renderer = new WebGLRenderer(rendererSettings);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Add a callback for the resize event`
    window.addEventListener( 'resize', onWindowResize, false );

    initComposer();

    //Call the update function. It will create an update loop
    update();
  },


  /**
   * changeOutlinedObject - Changes the outlined object. If null, then just outline nothing *
   *
   * @param  {Object3D} object The object to be outlined
   * @return {Null}            null
   */
  changeOutlinedObject(object) {
    if(object !== undefined) {
      outlinePass.selectedObjects = [object];
    }
    else {
      outlinePass.selectedObjects = [];
    }
  },

  /**
   * addUpdate - Registers an update function
   *
   * @param  {String} updateName   The name of the update function
   * @param  {Function} updateFn   The update function, will be called on every update
   * @return {Null}                null
   */
  addUpdate(updateName, updateFn) {
    updateList.push({name: updateName, fn: updateFn });
  },

  /**
   * removeUpdate - DOES NOT WORK
   *
   * @return {type}  description
   */
  removeUpdate() {
    //TODO: find a way to call this function when an object is removed from the scene
  },

  /**
   * getDelta - Returns the Delta between frames in ms
   *
   * @return {Number}  The time delta
   */
  get Delta() { return delta; },

  /**
   * get DEBUG - Whether or not in debug mode
   *
   * @return {boolean}  Whether or not in debug mode
   */
  get DEBUG() {
    return DEBUG;
  }
};


/**
 * update - Creates the update loop. Calls all the registered update functions
 *
 * @return {Null}  null
 */
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

/**
 * onWindowResize - Callback for the resize event of the window
 *
 * @return {Null}  null
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function initComposer() {
  composer = new EffectComposer(renderer);

  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
  composer.addPass(outlinePass);

  let loader = new TextureLoader();
  loader.load("textures/tri_pattern.jpg", (texture) => {
    outlinePass.patternTexture = texture;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  });

  effectFXAA = new ShaderPass( FXAAShader );
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight);
  effectFXAA.renderToScreen = true;
  composer.addPass(effectFXAA);

  engine.addUpdate("composerRender", () => {
    composer.render();
  });
}

export {
  engine,
  camera,
  scene,
  renderer
};
