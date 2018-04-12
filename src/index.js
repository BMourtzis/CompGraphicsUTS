import { pointerLockInit } from "./utils/pointerLockControls";
import { SimpleFloor } from "./misc/floors";
import { Cowboy } from "./misc/cowboy";
import { engine, scene, camera } from "./utils/engine";

init();

function init() {
  engine.init();

  pointerLockInit();
  scene.add(SimpleFloor());
  Cowboy(scene);
}
