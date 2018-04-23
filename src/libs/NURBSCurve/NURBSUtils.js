import { Vector3, Vector4 } from "three";

// NURBS utils

let NURBSUtils = {
  // Finds knot vector span.
  findSpan(degree, para, knot) {
    let unit = knot.length - degree - 1;

    if (para >= knot[unit]) {
      return unit - 1;
    }

    if (para <= knot[degree]) {
      return degree;
    }

    let low = degree;
    let high = unit;
    let mid = Math.floor((low + high) / 2);

    while (para < knot[mid] || para >= knot[mid + 1]) {
      if (para < knot[mid]) {
        high = mid;
      }
      else {
        low = mid;
      }

      mid = Math.floor((low + high) / 2);
    }

    return mid;
  },
  // Calculate basis functions. See The NURBS Book, page 70, algorithm A2.2
  // returns array[p+1] with basis functions values.
  calcBasisFunctions(span, para, degree, knot) {
    let arr = [];
    let left = [];
    let right = [];
    arr[0] = 1.0;

    for (let j = 1; j <= degree; ++j) {
      left[j] = para - knot[span + 1 - j];
      right[j] = knot[span + j] - para;

      let saved = 0.0;

      for (let i = 0; i < j; ++i) {
        let rv = right[i + 1];
        let lv = left[j - i];
        let temp = arr[i] / (rv + lv);
        arr[i] = saved + (rv * temp);
        saved = lv * temp;
      }

      arr[j] = saved;
    }

    return arr;
  },

  // Calculate B-Spline curve points. See The NURBS Book, page 82, algorithm A3.1.
  // p : degree of B-Spline
  // U : knot vector
  // P : control points (x, y, z, w)
  // u : parametric point
  // returns point for given u
  calcBSplinePoint(degree, knot, control, para) {
    let span = this.findSpan(degree, para, knot);
    let arr = this.calcBasisFunctions(span, para, degree, knot);
    let vec = new Vector4(0, 0, 0, 0);

    for (let j = 0; j <= degree; ++j) {
      let point = control[span - degree + j];
      let Nj = arr[j];
      let wNj = point.w * Nj;
      vec.x += point.x * wNj;
      vec.y += point.y * wNj;
      vec.z += point.z * wNj;
      vec.w += point.w * Nj;
    }

    return vec;
  },

  // Calculate basis functions derivatives. See The NURBS Book, page 72, algorithm A2.3.
  // span : span in which u lies
  // u    : parametric point
  // p    : degree
  // n    : number of derivatives to calculate
  // U    : knot vector
  // returns array[n+1][p+1] with basis functions derivatives
  calcBasisFunctionDerivatives(span, para, degree, deriv, knot) {
    let zeroArr = [];
    for (let i = 0; i <= degree; ++i) {
      zeroArr[i] = 0.0;
    }

    let ders = [];
    for (let i = 0; i <= deriv; ++i) {
      ders[i] = zeroArr.slice(0);
    }

    let ndu = [];
    for (let i = 0; i <= degree; ++i) {
      ndu[i] = zeroArr.slice(0);
    }

    ndu[0][0] = 1.0;

    let left = zeroArr.slice(0);
    let right = zeroArr.slice(0);

    for (let j = 1; j <= degree; ++j) {
      left[j] = para - knot[span + 1 - j];
      right[j] = knot[span + j] - para;

      let saved = 0.0;

      for (let i = 0; i < j; i++) {
        let rv = right[i + 1];
        let lv = left[j - i];
        ndu[j][i] = rv + lv;

        let temp = ndu[i][j - 1] / ndu[j][i];
        ndu[i][j] = saved + (rv * temp);
        saved = lv * temp;
      }

      ndu[j][j] = saved;
    }

    for (let j = 0; j <= degree; ++j) {
      ders[0][j] = ndu[j][degree];
    }

    for (let x = 0; x <= degree; x++) {
      let s1 = 0;
      let s2 = 1;

      let z = [];
      for (let i = 0; i <= degree; ++i) {
        z[i] = zeroArr.slice(0);
      }
      z[0][0] = 1.0;

      for (let y = 1; y <= deriv; y++) {
        let w = 0.0;
        let rk = x - y;
        let pk = degree - y;

        if (x >= y) {
          z[s2][0] = z[s1][0] / ndu[pk + 1][rk];
          w = z[s2][0] * ndu[rk][pk];
        }

        let j1 = rk >= -1 ? 1 : -rk;
        let j2 = x - 1 <= pk ? y - 1 : degree - x;

        for (let j = j1; j <= j2; ++j) {
          z[s2][j] = (z[s1][j] - z[s1][j - 1]) / ndu[pk + 1][rk + j];
          w += z[s2][j] * ndu[rk + j][pk];
        }

        if (x <= pk) {
          z[s2][y] = -z[s1][y - 1] / ndu[pk + 1][x];
          w += z[s2][y] * ndu[x][pk];
        }

        ders[y][x] = w;

        let j = s1;
        s1 = s2;
        s2 = j;
      }
    }

    let x = degree;

    for (let i = 1; i <= deriv; i++) {
      for (let j = 0; j <= degree; ++j) {
        ders[i][j] *= x;
      }
      x *= degree - i;
    }

    return ders;
  },

  // Calculate derivatives of a B-Spline. See The NURBS Book, page 93, algorithm A3.2.
  // p  : degree
  // U  : knot vector
  // P  : control points
  // u  : Parametric points
  // nd : number of derivatives
  // returns array[d+1] with derivatives
  calcBSplineDerivatives(degree, knot, control, para, nd) {
    let du = nd < degree ? nd : degree;
    let CK = [];
    let span = this.findSpan(degree, para, knot);
    let nders = this.calcBasisFunctionDerivatives(span, para, degree, du, knot);
    let Pw = [];

    for (let i = 0; i < control.length; ++i) {
      let point = control[i].clone();

      let {w} = point;

      point.x *= w;
      point.y *= w;
      point.z *= w;

      Pw[i] = point;
    }

    for (let i = 0; i <= du; i++) {
      let point = Pw[span - degree].clone().multiplyScalar(nders[i][0]);

      for (let j = 1; j <= degree; j++) {
        point.add(Pw[span - degree + j].clone().multiplyScalar(nders[i][j]));
      }

      CK[i] = point;
    }

    for (let i = du + 1; i <= nd + 1; i++) {
      CK[i] = new Vector4(0, 0, 0);
    }

    return CK;
  },

  // Calculate "K over I"
  // returns k!/(i!(k-i)!)
  calcKoverI(x, i) {
    let nom = 1;

    for (let j = 2; j <= x; ++j) {
      nom *= j;
    }

    let denom = 1;

    for (let j = 2; j <= i; ++j) {
      denom *= j;
    }

    for (let j = 2; j <= x - i; ++j) {
      denom *= j;
    }

    return nom / denom;
  },

  // Calculate derivatives (0-nd) of rational curve. See The NURBS Book, page 127, algorithm A4.2.
  // Pders : result of function calcBSplineDerivatives
  // returns array with derivatives for rational curve.
  calcRationalCurveDerivatives(Pders) {
    let nd = Pders.length;
    let Aders = [];
    let wders = [];

    for (let i = 0; i < nd; ++i) {
      let point = Pders[i];
      Aders[i] = new Vector3(point.x, point.y, point.z);
      wders[i] = point.w;
    }

    let CK = [];

    for (let j = 0; j < nd; j++) {
      let vec = Aders[j].clone();

      for (let i = 1; i <= j; ++i) {
        vec.sub(CK[j - i].clone().multiplyScalar(this.calcKoverI(j, i) * wders[i]));
      }

      CK[j] = vec.divideScalar(wders[0]);
    }

    return CK;
  },

  // Calculate NURBS curve derivatives. See The NURBS Book, page 127, algorithm A4.2.
  // p  : degree
  // U  : knot vector
  // P  : control points in homogeneous space
  // u  : parametric points
  // nd : number of derivatives
  // returns array with derivatives.
  calcNURBSDerivatives(degree, knot, control, para, nd) {
    let Pders = this.calcBSplineDerivatives(degree, knot, control, para, nd);

    return this.calcRationalCurveDerivatives(Pders);
  },

  // Calculate rational B-Spline surface point. See The NURBS Book, page 134, algorithm A4.3.
  // p1, p2 : degrees of B-Spline surface
  // U1, U2 : knot vectors
  // P      : control points (x, y, z, w)
  // u, v   : parametric values
  // returns point for given (u, v)
  calcSurfacePoint(p1, p2, U1, U2, control, para1, para2) {
    let uspan = this.findSpan(p1, para1, U1);
    let vspan = this.findSpan(p2, para2, U2);
    let Nu = this.calcBasisFunctions(uspan, para1, p1, U1);
    let Nv = this.calcBasisFunctions(vspan, para2, p2, U2);
    let temp = [];

    for (let i = 0; i <= p2; i++) {
      temp[i] = new Vector4(0, 0, 0, 0);
      for (let j = 0; j <= p1; j++) {
        let point = control[uspan - p1 + j][vspan - p2 + i].clone();
        // let w = point.w;
        let {w} = point;
        point.x *= w;
        point.y *= w;
        point.z *= w;
        temp[i].add(point.multiplyScalar(Nu[j]));
      }
    }

    let Sw = new Vector4(0, 0, 0, 0);
    for (let i = 0; i <= p2; i++) {
      Sw.add(temp[i].multiplyScalar(Nv[i]));
    }

    Sw.divideScalar(Sw.w);

    return new Vector3(Sw.x, Sw.y, Sw.z);
  }
};

export {
  NURBSUtils
};
