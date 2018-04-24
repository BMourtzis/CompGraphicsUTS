import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";
import { room } from "./misc/room";

init();

// the entry point that initialises everything
function init() {
  engine.init(true);

  // initalize objects
  gridFloor();
  controls();
    cowboy();
    room();
}
