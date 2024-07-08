import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Text {
    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init() {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', (font) => {

            // creating a text geometry
            const textGeometry = new TextGeometry('WASD to Move', {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
            });

            const textGeometry1 = new TextGeometry('or Use the Arrow Keys!', {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);

            

            textMesh.position.set(2, 0, 0); // Adjust the position as needed

            textMesh1.position.set(2, 0, 2); // Adjust the position as needed

            textMesh.rotation.set(-Math.PI / 2, 0, 0);
            textMesh1.rotation.set(-Math.PI / 2, 0, 0); // Rotate text to face the camera if necessary

            this.scene.add(textMesh);
            this.scene.add(textMesh1);
        });
    }
}

export default Text;
