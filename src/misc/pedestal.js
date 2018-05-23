import { Matrix4 } from "three";
import { promisifyLoad } from "../utils/modelUtils";

function detailedPedestal() {
  return promisifyLoad("models/ET_Pedestal.fbx").then((obj) => {
    // Scale the pedestal
    let matrix = new Matrix4();
    matrix.makeScale(0.8, 0.8, 0.8);
    obj.applyMatrix(matrix);

    return obj;
  });
}

export {
  detailedPedestal
};
