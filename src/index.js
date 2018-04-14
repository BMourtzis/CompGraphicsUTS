import { engine } from "./utils/engine";
import Controls from "./utils/pointerLockControls";
import { GridFloor } from "./misc/floors";
import { Cowboy } from "./misc/cowboy";
import { TestCollder} from "./utils/collider";
import polyfillCollilders from "./libs/polyfills/Object3DColliders"
import COMPONENTTYPE from "./utils/component";

polyfillCollilders();
init();

// the entry point that initialises everything
function init() {
  engine.init(true);

  // initalize objects

  Controls();
  GridFloor();
  Cowboy();
  TestCollder();
}
