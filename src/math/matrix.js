define([], function() {

    function transpose(m, out) {
        var length = m.length,
            mo = out || new Array(length),
            dimension = Math.sqrt(length),
            row,
            col;

        for (col = 0; col < dimension; col++) {
            for (row = 0; row < dimension; row++) {
                mo[(dimension * row) + col] = m[(dimension * col) + row];
            }
        }

        return mo;
    }

    function multiply(m1, m2, out) {
        var length = m1.length,
            dimension = Math.sqrt(length),
            outIndex = 0,
            col,
            m1Index,
            m2Index,
            m1Row,
            m2Row;

        out = out || makeZeroes(dimension);

        for (m1Row = 0; m1Row < dimension; m1Row++) {
            for (m2Row = 0; m2Row < dimension; m2Row++, outIndex++) {
                for (col = 0; col < dimension; col++) {
                    m1Index = (dimension * m1Row) + col;
                    m2Index = (dimension * col) + m2Row;
                    out[outIndex] += m1[m1Index] * m2[m2Index];
                }
            }
        }

        return out;
    }

    function multiplyVector(m, v, out) {
        var i = 0,
            mDimension = Math.sqrt(m.length),
            vDimension = v.length,
            row,
            col;

        out = out || [0, 0, 0];

        if (mDimension - vDimension) {
            multiplyVectorPadded(m, v, out);
        } else {
            for (col = 0; col < mDimension; col++) {
                for (row = 0; row < mDimension; row++) {
                    out[col] += v[col] * m[(mDimension * row) + col];
                }
            }
        }

        return out;
    }

    function multiplyVectorPadded(m, v, out) {
        var mDimension = Math.sqrt(m.length),
            lastRowOffset = mDimension * (mDimension - 1),
            d = 0,
            row,
            col;

        for (col = 0; col < mDimension; col++) {
            d += (v[col] || 1) * m[lastRowOffset + col];
        }

        d = 1 / d;

        for (row = 0; row < v.length; row++) {
            for (col = 0; col < mDimension; col++) {
                out[row] += (v[col] || 1) * m[(mDimension * row) + col];
            }
            out[row] *= d;
        }

        return out;
    }

    function makeRotationX(degrees) {
        var radMult = 0.0174532,
            theta = degrees * radMult,
            s = Math.sin(theta),
            c = Math.cos(theta);

        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ];
    }

    function makeRotationY(degrees) {
        var radMult = 0.0174532,
            theta = degrees * radMult,
            s = Math.sin(theta),
            c = Math.cos(theta);

        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ];
    }

    function makeRotationZ(degrees) {
        var radMult = 0.0174532,
            theta = degrees * radMult,
            s = Math.sin(theta),
            c = Math.cos(theta);

        return [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    function makeTranslation() {
        var args = Array.prototype.slice.call(arguments, 0),
            argLen = args.length,
            dimension = argLen + 1,
            out = new Array(dimension * dimension),
            offset,
            row,
            col;

        for (row = 0; row < dimension; row++) {
            offset = (dimension * row);
            for (col = 0; col < dimension - 1; col++) {
                out[offset + col] = row === col ? 1 : 0;
            }
            out[offset + col] = row >= argLen ? 1 : args[row];
        }

        return out;
    }

    function makeScale() {
        var args = Array.prototype.slice.call(arguments, 0),
            argLen = args.length,
            dimension = argLen + 1,
            out = new Array(dimension * dimension),
            offset,
            row,
            col;

        for (row = 0; row < dimension; row++) {
            offset = (dimension * row);
            for (col = 0; col < dimension; col++) {
                out[offset + col] = row === col ? args[row] : 0;
            }
        }

        out[out.length - 1] = 1;

        return out;
    }

    function makeIdentity(dimension) {
        var out = new Array(dimension * dimension),
            offset,
            row,
            col;

        for (row = 0; row < dimension; row++) {
            offset = (dimension * row);
            for (col = 0; col < dimension; col++) {
                out[offset + col] = row === col ? 1 : 0;
            }
        }

        return out;
    }

    function makeZeroes(dimension) {
        var out = new Array(dimension * dimension),
            i;

        for (i = 0; i < out.length; i++) {
            out[i] = 0;
        }

        return out;
    }

    return {
        transpose: transpose,
        multiply: multiply,
        multiplyVector: multiplyVector,
        makeZeroes: makeZeroes,
        makeIdentity: makeIdentity,
        makeScale: makeScale,
        makeTranslation: makeTranslation,
        makeRotationX: makeRotationX,
        makeRotationY: makeRotationY,
        makeRotationZ: makeRotationZ
    };
});