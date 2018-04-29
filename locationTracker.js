/*
//  PositionManager
//
//  this function is used to track the position of the player in the scene,
//  we need to track the location of the player in case it is standing near a sculture 
//  in that case we need to identify which platform and what ui we need to display 
//
//  by nelson 
*/


function PositionManager(){

  // local var
  var self = this;
  

  // we get the player location from the playerCollider box 
  // from the collider.js 
  this.isPlayerOnPlatform = function(position){
    console.log(position);

    //if(onPlatform){
    //  self.updateUI(platformID)
    //}
  }

  this.updateUI = function(platformID){

    switch(platformID){
      case 1:
        break;

      default:
        break;
    }

  }


}
