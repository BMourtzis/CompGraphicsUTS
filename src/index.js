import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { gridFloor } from "./misc/floors";
import { cowboy } from "./misc/cowboy";
import { chief } from "./misc/chief";
import { rex } from "./misc/rex";
import { snake } from "./misc/snake";
import { mario8bit } from "./misc/mario8bit";
import { AmiiboMario } from "./misc/amiiboMario";
import { samus } from "./misc/samus";
import { laraCroft } from "./misc/laraCroft";
import { pacman } from "./misc/pacman";
import { ghost } from "./misc/ghost";
import { dragonborn } from "./misc/dragonborn";
import { room } from "./misc/room";

init();

// the entry point that initialises everything
function init() {
  engine.init(true);

  // initalize objects
  gridFloor();
  room();
  controls();
  cowboy();
  chief();
  rex();
  snake();
  mario8bit();
  AmiiboMario();
  samus();
  laraCroft();
  pacman();
  ghost();
  dragonborn();
}
