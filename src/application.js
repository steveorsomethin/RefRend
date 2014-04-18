// http://jsperf.com/complex-loop-unrolling
/*
 * Main application entry point
 */
define(['three', 'threeStats', 'matrix'],
function(THREE, Stats, matrix) {
    var innerWidth = window.innerWidth,
        innerHeight = window.innerHeight,
        shell = document.getElementById('shell'),
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        stats = new Stats(),
        deg = 0,
        points = [[200, 200, 0], [400, 200, 0], [300, 400, 0]];

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
            trans = matrix.makeTranslation(-300, -300, -50),
            invTrans = matrix.makeTranslation(300, 300, 50),
            rotTrans = matrix.multiply(rot, trans),
            mat = matrix.multiply(invTrans, rotTrans),
            p1 = matrix.multiplyVector(mat, points[0]),
            p2 = matrix.multiplyVector(mat, points[1]),
            p3 = matrix.multiplyVector(mat, points[2]);

        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'rgba(200, 0, 0, 1.0)';
        context.strokeStyle = '#FF0000';
        context.beginPath();
        context.moveTo(p1[0], p1[1]);
        context.lineTo(p2[0], p2[1]);
        context.lineTo(p3[0], p3[1]);
        context.closePath();
        context.stroke();
        context.fill();
    }

    

    console.log('Application started');
});