import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";
import { testCollder} from "./utils/collider";
import polyfillCollilders from "./libs/polyfills/Object3DColliders"

polyfillCollilders();
init();

// the entry point that initialises everything
function init() {
  engine.init(true);

  // initalize objects
  controls();
  gridFloor();
  cowboy();
  testCollder();
}
