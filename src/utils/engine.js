import { PerspectiveCamera, Scene, HemisphereLight, WebGLRenderer, Color, Fog } from "three";

var renderer, camera, scene;

var updateList = [];

const rendererSettings = {
 precision: "lowp"
}

var engine = {
  // initalizer of the "engine", creates a new camera, scene with fog and the renderer
  init() {
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    scene = new Scene();
    scene.background = new Color(0xffffff);
    scene.fog = new Fog(0xffffff, 0, 750);

    var light = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);

    renderer = new WebGLRenderer(rendererSettings);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );

    update();
  },
  //adds the update function to the update loop
  addUpdate(updateName, updateFn) {
    updateList.push({name: updateName, fn: updateFn });
  }
}

function update() {
  requestAnimationFrame(update);
  for(let update of updateList) {
    update.fn();
  }
  renderer.render(scene, camera);
}

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
