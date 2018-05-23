import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { pointerTriggerInit } from "./utils/pointerTrigger";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";
import { room } from "./misc/room";
import { initLightManager } from "./utils/lightManager";

init();

// the entry point that initialises everything
function init() {
  engine.init(false);
  pointerTriggerInit();
  initLightManager();

  // initalize objects
  gridFloor();
  controls();
  cowboy();
  room();
}
