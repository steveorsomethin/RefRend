define(['matrix'], function(matrix) {
    function cross(v1, v2, out) {
        var ax = v1[0], ay = v1[1], az = v1[2],
            bx = v2[0], by = v2[1], bz = v2[2];

        out = out || [0, 0, 0];

        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;

        return out;
    }

    function dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }

    function multiplyMatrix(v, m, out) {
        return matrix.multiplyVector(m, v, out);
    }

    return {
        multiplyMatrix: multiplyMatrix,
        cross: cross,
        dot: dot
    };
});