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
import { room, generateWalls } from "./misc/room";
import { initLightManager } from "./utils/lightManager";

init();

// the entry point that initialises everything
function init() {
  engine.init(false);
  pointerTriggerInit();
  initLightManager();

  // initalize objects
  gridFloor();
  // room();
  controls();
  skybox();

  // Start loading all the models
  // when done start the update loop and show the blocker
  Promise.all([
    generateWalls(),
    cowboy(),
    chief(),
    rex(),
    snake(),
    mario8bit(),
    AmiiboMario(),
    samus(),
    laraCroft(),
    pacman(),
    ghost(),
    dragonborn()
  ]).then(() => {
    //This starts the update loop
    engine.startUpdateLoop();

    //Remove loading screen and show the blocker
    document.getElementById('loadingScreen').style.display = "none";
    document.getElementById('blocker').style.display = "block";
  });
}
