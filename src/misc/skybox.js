import { scene } from "../utils/engine";
import { CubeGeometry, MeshBasicMaterial, TextureLoader, DoubleSide, MeshFaceMaterial, Mesh } from "three";


/**
 * skybox - Creates a new skybox
 *
 * @return {Null}  null
 */
function skybox() {
    let geometry = new CubeGeometry(1000, 1000, 1000);
    let textureLoader = new TextureLoader();

    let cubeMaterials = [
        new MeshBasicMaterial({ map: textureLoader.load("skybox/front.png"), side: DoubleSide }),
        new MeshBasicMaterial({ map: textureLoader.load("skybox/back.png"), side: DoubleSide }),
        new MeshBasicMaterial({ map: textureLoader.load("skybox/up.png"), side: DoubleSide }),
        new MeshBasicMaterial({ map: textureLoader.load("skybox/down.png"), side: DoubleSide }),
        new MeshBasicMaterial({ map: textureLoader.load("skybox/right.png"), side: DoubleSide }),
        new MeshBasicMaterial({ map: textureLoader.load("skybox/left.png"), side: DoubleSide })
    ];

    let cubeMaterial = new MeshFaceMaterial(cubeMaterials);
    let cube = new Mesh(geometry, cubeMaterial);

    cube.position.set(0, 0, 0);

    scene.add(cube);

    //let ambientLight = new AmbientLight(0xFFFFFF, 0.3);
    //scene.add(ambientLight);
}

export {
    skybox
};
