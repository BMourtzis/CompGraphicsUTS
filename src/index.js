import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";
import { testCollder, addPlayerCollider, updatePlayerCollider } from "./utils/collider";
import { Vector3 } from "three";

init();

// the entry point that initialises everything
function init() {
  engine.init(true);

  // initalize objects
  controls();
  gridFloor();
  cowboy();
  // addPlayerCollider();
}
