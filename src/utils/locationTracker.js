/*
//  PositionManager
//
//  this function is used to track the position of the player in the scene,
//  we need to track the location of the player in case it is standing near a sculture 
//  in that case we need to identify which platform and what ui we need to display 
//
*/

import { Box3, Vector3 } from "three";
import { scene, camera, engine, HUDRenderer } from "./engine";
import { cowboy } from "../misc/cowboy";
//Renderer settings used by the WebGLRenderer
const rendererSettings = {
 precision: "lowp"
};


function PositionManager(){

  // local var
  var self = this;

  var HUD_header;
  var HUD_info;

  var title_1 = "TITLE";

  var isPlayerOnRange = false;
  

  this.init = function(){
    // get  text panels
    HUD_header = document.getElementById('Title_HUD');
    HUD_info = document.getElementById('Info_HUD');
  }

  this.updateUI = function(text){

      // check if we are currently in the game 
      // if we are the display the UI else dont show it 
      var element = document.body;
      if (text != null) {
          // show UI
          //console.log("SHOW SOMETHING!!");
          //HUD_header.innerHTML = '<span class="HUBTitleStyle">' + title_1 + '</span>';
          HUD_info.innerHTML = '<span class="HUBInfoStyle">' + text + '</span>';
          //HUD_header.style.display = '';
          HUD_info.style.display = '';

      }else{
          // hide UI
          HUD_header.style.display = 'none';
          HUD_info.style.display = 'none';
      }
  }

  this.panelTween = function(){
    //HUD_info.alpha ? 1 / 0;
  }
}

export {PositionManager};