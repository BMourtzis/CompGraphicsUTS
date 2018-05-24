import { Matrix4 } from "three";
import { promisifyLoad } from "../utils/modelUtils";

let detPedestal;

function detailedPedestal() {
  if(!detPedestal) {
    detPedestal = promisifyLoad("models/ET_Pedestal.fbx").then((obj) => {
      // Scale the pedestal
      let matrix = new Matrix4();
      matrix.makeScale(0.8, 0.8, 0.8);
      obj.applyMatrix(matrix);

      return obj;
    });
  }

  return detPedestal;
}

export {
  detailedPedestal
};
