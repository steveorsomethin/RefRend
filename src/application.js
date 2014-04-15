/*
 * Main application entry point
 */
define(['three', 'threeStats'],
function(THREE, Stats) {
    var container = document.getElementById('shell'),
        stats = new Stats(),
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000),
        scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        geometry = new THREE.CubeGeometry(200, 200, 200),
        material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5}),
        cube = new THREE.Mesh(geometry, material),
        hex,
        i;

    for (i = 0; i < geometry.faces.length; i += 2) {
        hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
    }

    camera.position.y = -100;
    camera.position.z = 1000;

    cube.position.y = 150;
    scene.add(cube);

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);

    animate();

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

    console.log('Application started');
});