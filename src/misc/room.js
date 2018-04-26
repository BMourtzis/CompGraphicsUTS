import { Matrix4 } from "three";
import { FBXLoader } from "../loaders/FBXLoader";
import { scene } from "../utils/engine";
import { addCollider } from "../utils/collider";



function room() {
    let loader = new FBXLoader();
        loader.load("models/wall.fbx", (backWall) => {
            let matrix = new Matrix4();
            matrix.makeScale(0.1, 0.1, 0.1);
            backWall.applyMatrix(matrix);

            backWall.position.set(-50, 5, 0);
            addCollider(backWall);

            scene.add(backWall);
    }); 

    loader.load("models/WallLeftRight.fbx", (rightWall) => {
        let matrix = new Matrix4();
        matrix.makeScale(0.1, 0.1, 0.1);
        //matrix.makeRotationY(degToRad(90));
        rightWall.applyMatrix(matrix);

        rightWall.position.set(-10, 5, -45);
        addCollider(rightWall);

        scene.add(rightWall);
    });

    loader.load("models/WallLeftRight.fbx", (leftWall) => {
        let matrix = new Matrix4();
        matrix.makeScale(0.1, 0.1, 0.1);
        //matrix.makeRotationY(degToRad(90));
        leftWall.applyMatrix(matrix);

        leftWall.position.set(-10, 5, 45);
        addCollider(leftWall);

        scene.add(leftWall);
    });
}

export {
    room
}