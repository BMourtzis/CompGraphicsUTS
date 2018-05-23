//  PositionManager
//
//  this function is used to track the position of the player in the scene,
//  we need to track the location of the player in case it is standing near a sculture
//  in that case we need to identify which platform and what ui we need to display
//
//  by nelson

// import {Box3, Vector3} from "three";
// import {scene, camera, engine, HUDRenderer} from "./engine";
// import {cowboy} from "../misc/cowboy";

function PositionManager() {
  let self = this;

  let HUD_header = document.getElementById('HUD');
  let HUD_info = document.getElementById('HUB_text');

  let text_1 = "v";

  let base_1;

  this.init = function() {
    // let loader = new FBXLoader();
    // loader.load("models/cowboy.fbx", (obj) => {
    //   console.log(cowboy);
    // });
    //
    //console.log(cowboy.returnPosition());

  }


  // we get the player location from the playerCollider box
  // from the collider.js
  this.isPlayerOnPlatform = function(zPos, xPos) {
    self.updateUI(null);
  };

  this.updateUI = function(platformID) {
    // check if we are currently in the game
    // if we are the display the UI else dont show it
    let element = document.body;
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      // show UI
      HUD_header.innerHTML = text_1;
      HUD_header.align = "center";
      HUD_header.style.top = "50%";
      HUD_header.style.font = "15px Good Times"
      HUD_header.style.display = '';
      HUD_info.style.display = '';
    }
    else {
      // hide UI
      HUD_header.style.display = 'none';
      HUD_info.style.display = 'none';
    }
  };
}

export {
  PositionManager
};
