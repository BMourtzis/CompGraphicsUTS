import { engine } from "./utils/engine";
import Controls from "./utils/pointerLockControls";
import { GridFloor } from "./misc/floors";
import { Cowboy } from "./misc/cowboy";
import { TestCollder} from "./utils/collider";

init();

// the entry point that initialises everything
function init() {
  engine.init();

  // initalize objects

  Controls();
  GridFloor();
  Cowboy();
  TestCollder();
}
