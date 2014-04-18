// http://jsperf.com/complex-loop-unrolling
/*
 * Main application entry point
 */
define(['three', 'threeStats', 'matrix', 'vector'],
function(THREE, Stats, matrix, vector) {
    var innerWidth = window.innerWidth,
        innerHeight = window.innerHeight,
        shell = document.getElementById('shell'),
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        stats = new Stats(),
        deg = 0,
        points = [
            // Front
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1],

            // Top
            [-1, -1, 1],
            [-1, -1, -1],
            [1, -1, -1],
            [-1, -1, 1],
            [1, -1, -1],
            [1, -1, 1],

            //Left
            [-1, -1, 1],
            [-1, 1, 1],
            [-1, 1, -1],
            [-1, -1, 1],
            [-1, 1, -1],
            [-1, -1, -1],

            // Back
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],

            // Bottom
            [-1, 1, 1],
            [-1, 1, -1],
            [1, 1, -1],
            [-1, 1, 1],
            [1, 1, -1],
            [1, 1, 1],

            //Left
            [1, -1, 1],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, 1],
            [1, 1, -1],
            [1, -1, -1]
        ];

    onWindowResize();
    shell.appendChild(canvas);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    shell.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);

    animate();

    function onWindowResize() {
        innerWidth = window.innerWidth;
        innerHeight = window.innerHeight;

        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    function render() {
        var degrees = deg++,
            rotX = matrix.makeRotationX(degrees),
            rotY = matrix.makeRotationY(degrees),
            rotZ = matrix.makeRotationZ(degrees),
            rot = matrix.multiply(rotZ, matrix.multiply(rotX, rotY)),
            scale = matrix.makeScale(100, 100, 100),
            // rot = matrix.makeIdentity(4),
            trans = matrix.makeTranslation(-50, -50, -50),
            invTrans = matrix.makeTranslation(400, 400, 400),
            rotTrans = matrix.multiply(rot, trans),
            mat = matrix.multiply(matrix.multiply(invTrans, rotTrans), scale),
            i,
            p1, p2, p3;

        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'rgba(255, 0, 0, 1.0)';
        context.strokeStyle = '#FF0000';

        for (i = 0; i < points.length; i += 3) {
            context.beginPath();

            p1 = matrix.multiplyVector(mat, points[i]);
            p2 = matrix.multiplyVector(mat, points[i + 1]);
            p3 = matrix.multiplyVector(mat, points[i + 2]);

            context.moveTo(p1[0], p1[1]);
            context.lineTo(p2[0], p2[1]);
            context.lineTo(p3[0], p3[1]);

            context.closePath();
            context.stroke();
            context.fill();
        }
    }

    console.log('Application started');
});