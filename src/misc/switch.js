import { engine } from "../utils/engine.js";
import { BoxGeometry, MeshBasicMaterial, Mesh, Math, Matrix4 } from "three";
import { addPointerTrigger } from "../utils/pointerTrigger";
import { outsideToggle } from "../utils/lightManager";

function wallSwitch(position, lightID) {
  console.log(lightID);
  let baseBox = new BoxGeometry(5, 5, 5);
  let baseMaterial = new MeshBasicMaterial({color: 0x0022cc});
  let base = new Mesh(baseBox, baseMaterial);

  let switchBox = new BoxGeometry(1, 2, 1);
  let switchMaterial = new MeshBasicMaterial({color: 0xffffff});
  let switchMesh = new Mesh(switchBox, switchMaterial);

  let rotationMatrix = new Matrix4();
  rotationMatrix.makeRotationY(Math.degToRad(30));
  switchMesh.applyMatrix(rotationMatrix);

  let on = true;

  base.add(switchMesh);
  base.position.add(position);

  addPointerTrigger(base, "A switch. Used to turn on or off the lights", () => { return undefined; }, () => {
    if(on) {
      let rotationMatrix = new Matrix4();
      rotationMatrix.makeRotationY(Math.degToRad(-30));
      switchMesh.applyMatrix(rotationMatrix);
    }
    else {
      let rotationMatrix = new Matrix4();
      rotationMatrix.makeRotationY(Math.degToRad(30));
      switchMesh.applyMatrix(rotationMatrix);
    }

    outsideToggle(lightID);
    on = !on;
  });
}

export {
  wallSwitch
};
