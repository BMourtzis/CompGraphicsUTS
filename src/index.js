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
import { rexBig } from "./misc/rexBig";
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
  room();
  controls();
  skybox();

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

  //giant Metal Gear Rex
  //rexBig();
}
