/*
//  PositionManager
//
//  this function is used to track the position of the player in the scene,
//  we need to track the location of the player in case it is standing near a sculture 
//  in that case we need to identify which platform and what ui we need to display 
//
//  by nelson 
*/

import { OrthographicCamera, Scene, Texture, MeshBasicMaterial, PlaneGeometry, Mesh, WebGLRenderer} from "three";
import { scene, camera, engine, HUDRenderer } from "./engine";
//Renderer settings used by the WebGLRenderer
const rendererSettings = {
 precision: "lowp"
};


function PositionManager(){

  // local var
  var self = this;

  var HUD = document.getElementById('HUD');
  var HUB_text = document.getElementById('HUB_text');

  this.init = function(){
     
          
      
  }


  // we get the player location from the playerCollider box 
  // from the collider.js 
  this.isPlayerOnPlatform = function(zPos, xPos){

  }

  this.updateUI = function(platformID){
      
      // check if we are currently in the game 
      // if we are the display the UI else dont show it 
      var element = document.body;
      if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
          // show UI
          HUD.style.display = '';
          HUB_text.style.display = '';
      }else{
          // hide UI
          HUD.style.display = 'none';
          HUB_text.style.display = 'none';
      }

    switch(platformID){
      case 1:
        break;

      default:
        break;
    }

  }




}

export {PositionManager};
