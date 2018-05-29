import { engine, scene } from "../utils/engine.js";
import { BoxGeometry, MeshBasicMaterial, Mesh, Math, Matrix4, Vector3 } from "three";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { outsideToggle, toggleKey } from "../utils/lightManager";

function wallSwitch(position, key) {
  let baseBox = new BoxGeometry(2, 1, 4);
  let baseMaterial = new MeshBasicMaterial({color: 0x884455});
  let base = new Mesh(baseBox, baseMaterial);

  let switchBox = new BoxGeometry(1, 1, 2);
  let switchMaterial = new MeshBasicMaterial({color: 0x888888});
  let switchMesh = new Mesh(switchBox, switchMaterial);

  switchMesh.position.add(new Vector3(0, 3, 0));

  let rotationMatrix = new Matrix4();
  rotationMatrix.makeRotationX(Math.degToRad(30));
  switchMesh.applyMatrix(rotationMatrix);

  let baseRotationMatrix = new Matrix4();
  baseRotationMatrix.makeRotationX(Math.degToRad(90));
  base.applyMatrix(baseRotationMatrix);

  //TODO: try to add way to see when the intensity changes, change the positon of the switch
  // NOTE: Maybe by adding the switch from the light manger you can also add a call on the toggle function

  let on = true;

  base.add(switchMesh);
  base.position.add(position);
  scene.add(base);

  addPointerTrigger(base, "A switch. Used to turn on or off the lights", () => { return undefined; }, () => {
    if(on) {
      let rotationMatrix = new Matrix4();
      rotationMatrix.makeRotationX(Math.degToRad(-60));
      switchMesh.applyMatrix(rotationMatrix);
    }
    else {
      let rotationMatrix = new Matrix4();
      rotationMatrix.makeRotationX(Math.degToRad(60));
      switchMesh.applyMatrix(rotationMatrix);
    }

    // outsideToggle(lightID);
    toggleKey(key);
    on = !on;
  });
}

export {
  wallSwitch
};
