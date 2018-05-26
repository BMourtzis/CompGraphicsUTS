import { engine } from "./utils/engine";
import controls from "./utils/pointerLockControls";
import { pointerTriggerInit } from "./utils/pointerTrigger";
import { gridFloor } from "./misc/floors";
import { skybox } from "./misc/skybox";
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
import { arthas } from "./misc/arthas";
import { room } from "./misc/room";
import { initLightManager } from "./utils/lightManager";
import { Link } from "./misc/Link"
import { Sonic } from "./misc/Sonic"
import { Crash } from "./misc/Crash"
import { RatchetAndClank } from "./misc/RatchetAndClank"

init();

// the entry point that initialises everything
function init() {
  engine.init(false);
  pointerTriggerInit();
  initLightManager();

  // initalize objects
  gridFloor();
  room();
  controls();
  skybox();

  //Characters
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
  arthas();
  Link();
  Crash();
  Sonic();
  RatchetAndClank();

}
