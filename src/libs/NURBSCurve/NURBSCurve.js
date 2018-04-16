import { Curve, Vector4, Vector3} from "three";
import { NURBSUtils } from "./NURBSUtils";

 // @author renej
 // NURBS curve object

 // Derives from Curve, overriding getPoint and getTangent.
 //Implementation is based on (x, y [, z=0 [, w=1]]) control points with w=weight.


function NURBSCurve(degree, knots, controlPoints, startKnot, endKnot) {
  Curve.call(this);

  this.degree = degree;
  this.knots = knots;
  this.controlPoints = [];

  // Used by periodic NURBS to remove hidden spans
  this.startKnot = startKnot || 0;
  this.endKnot = endKnot || (this.knots.length - 1);

  for (let i = 0; i < controlPoints.length; ++i) {
    // ensure Vector4 for control points
    let point = controlPoints[i];
    this.controlPoints[i] = new Vector4(point.x, point.y, point.z, point.w);
  }
}

NURBSCurve.prototype = Object.create(Curve.prototype);
NURBSCurve.prototype.constructor = NURBSCurve;

NURBSCurve.prototype.getPoint = function(t) {
  // linear mapping t->u
  let u = this.knots[this.startKnot] + (t * (this.knots[this.endKnot] - this.knots[this.startKnot]));

  // following results in (wx, wy, wz, w) homogeneous point
  let hpoint = NURBSUtils.calcBSplinePoint(this.degree, this.knots, this.controlPoints, u);

  if (hpoint.w !== 1.0) {
    // project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
    hpoint.divideScalar(hpoint.w);
  }

  return new Vector3(hpoint.x, hpoint.y, hpoint.z);
};


NURBSCurve.prototype.getTangent = function(t) {
  let u = this.knots[0] + (t * (this.knots[this.knots.length - 1] - this.knots[0]));
  let ders = NURBSUtils.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, u, 1);
  let tangent = ders[1].clone();
  tangent.normalize();

  return tangent;
};

// let NURBSCurvePrototype = {
//   "constructor": NURBSCurve,
//   getPoint(t) {
//     // linear mapping t->u
//     let u = this.knots[this.startKnot] + (t * (this.knots[this.endKnot] - this.knots[this.startKnot]));
//
//     // following results in (wx, wy, wz, w) homogeneous point
//     let hpoint = NURBSUtils.calcBSplinePoint(this.degree, this.knots, this.controlPoints, u);
//
//     if (hpoint.w !== 1.0) {
//       // project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
//       hpoint.divideScalar(hpoint.w);
//     }
//
//     return new Vector3(hpoint.x, hpoint.y, hpoint.z);
//   },
//   getTangent(t) {
//     let u = this.knots[0] + (t * (this.knots[this.knots.length - 1] - this.knots[0]));
//     let ders = NURBSUtils.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, u, 1);
//     let tangent = ders[1].clone();
//     tangent.normalize();
//
//     return tangent;
//   }
// };
//
// Object.setPrototypeOf(NURBSCurve, NURBSCurvePrototype);

export {
  NURBSCurve
};
