import { FBXLoader } from "../loaders/FBXLoader";
import { Matrix4 } from "three";

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

function promisifyLoad(url) {
  let loader = new FBXLoader();
  let promise = new Promise((resolve, reject) => {
    loader.load(url, (obj) => {
      resolve(obj);
    }, () => { return null; }, (err) => {
      reject(err);
    });
  });

  return promise;
}

export {
  detailedPedestal
};
