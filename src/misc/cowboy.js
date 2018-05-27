import { Vector3, Matrix4, Math } from "three";
import { scene } from "../utils/engine";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { addCollider, addTrigger } from "../utils/collider";
import { detailedPedestal } from "./pedestal";
import { addLightingHandler } from "../utils/lightManager";
import { addSpotlight, promisifyLoad, addYRotation } from "../utils/modelUtils";
import { wallSwitch } from "./switch";

function cowboy() {
  Promise.all([detailedPedestal(), promisifyLoad("models/cowboy.fbx")]).then(([ped, obj]) => {
    // Scale the cowboy
    let matrix = new Matrix4();
    matrix.makeScale(0.01, 0.01, 0.01);
    obj.applyMatrix(matrix);
    ped.add(obj);

    //Set right position and rotation
      ped.position.set(-140, 1, 0);
      obj.position.set(0, 11.4, 0);
      obj.rotation.set(0, Math.degToRad(90), 0);
    addCollider(ped);

    let spotLight = addSpotlight(new Vector3(50, 40, 0));
    ped.add(spotLight);

    //Add a key binding toggle the light. Bidns the light to key "1"
    let lightID = addLightingHandler(49, spotLight);

    wallSwitch(new Vector3(0, 8, 43), lightID);

    // engine.outlineObject(ped);

    // add Y rotation to the model
    addYRotation(obj);

    let text = "Name: The Cowboy<br> First Appearance: <br> Model Date: <br> Description: <br>";
    addPointerTrigger(ped, text, lookCallback, clickCallback);

    //Trigger to turn the light on when entering the sphere
    addTrigger(50, ped.position, () => {
      spotLight.intensity = 1;
    }, 0);

    //Trigger to turn the light off when leaving the sphere
    addTrigger(50, ped.position, () => {
      spotLight.intensity = 0;
    }, 1);

    scene.add(ped);
  }, (err) => {
    console.log(err);
  });
}

function lookCallback() {
  // console.log("A lookCallback");
}

function clickCallback() {
  // console.log("A clickCallback");
}

export {
  cowboy
};
