import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";

init();

// the entry point that initialises everything
function init() {
  engine.init(false);

  // initalize objects
  controls();
  gridFloor();
  cowboy();
}
