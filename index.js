function main() {
    const canvas = document.querySelector('#c');

    const props = {
        fov: 58,
        aspect: canvas.clientWidth / canvas.clientHeight,
        near: 0.1,
        far: 2000
    };

    const photoUrl = 'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg';

    const camera = new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    new THREE.OrbitControls(camera, canvas);

    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(photoUrl, () => {
        const rendererTarget = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rendererTarget.fromEquirectangularTexture(renderer, texture);
        scene.background = rendererTarget.texture;
    });

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)

}

main();