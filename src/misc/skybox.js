import { scene } from "../utils/engine";
import { CubeGeometry, MeshBasicMaterial, TextureLoader, DoubleSide, MeshFaceMaterial, Mesh, AmbientLight } from "three";

function skybox() {
    let geometry = new CubeGeometry(10000, 10000, 10000);
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
    scene.add(cube);

    //let ambientLight = new AmbientLight(0xFFFFFF, 0.3);
    //scene.add(ambientLight);
};

export {
    skybox
};