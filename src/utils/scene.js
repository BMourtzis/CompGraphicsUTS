import { Scene, HemisphereLight, Fog, Color } from "three";

function SimpleScene() {
  var scene = new Scene();
  scene.background = new Color(0xffffff);
  scene.fog = new Fog(0xffffff, 0, 750);

  var light = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  return scene;
}

export { SimpleScene };
