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

// NURBSCurve.prototype = Object.create(Curve.prototype);

Object.setPrototypeOf(NURBSCurve, {
  getPoint(to) {
    // linear mapping t->u
    let unit = this.knots[this.startKnot] + (to * (this.knots[this.endKnot] - this.knots[this.startKnot]));

    // following results in (wx, wy, wz, w) homogeneous point
    let hpoint = NURBSUtils.calcBSplinePoint(this.degree, this.knots, this.controlPoints, unit);

    if (hpoint.w !== 1.0) {
      // project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
      hpoint.divideScalar(hpoint.w);
    }

    return new Vector3(hpoint.x, hpoint.y, hpoint.z);
  },
  getTangent(to) {
    let unit = this.knots[0] + (to * (this.knots[this.knots.length - 1] - this.knots[0]));
    let ders = NURBSUtils.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, unit, 1);
    let tangent = ders[1].clone();
    tangent.normalize();

    return tangent;
  }
});

export {
  NURBSCurve
};
