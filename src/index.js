import Controls from "./utils/pointerLockControls";
import { SimpleFloor } from "./misc/floors";
import { Cowboy } from "./misc/cowboy";
import { engine } from "./utils/engine";

init();

// the entry point that initialises everything
function init() {
  engine.init();

  // initalize objects
  Controls();
  SimpleFloor();
  Cowboy();
}
