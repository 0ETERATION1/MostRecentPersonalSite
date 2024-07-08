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
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_regular.typeface.json', (font) => {
            const textString = this.isMobileDevice() ? 'Use Blue Circle to Move' : 'WASD or Arrow Keys to Move';
            const additionalTextString = 'Enter a Portal to Find out More!';

            // Main Text Geometry
            const textGeometry = new TextGeometry(textString, {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
            });

            // Additional Text Geometry
            const textGeometry2 = new TextGeometry(additionalTextString, {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);

            // Adjust position based on device type
            if (this.isMobileDevice()) {
                textMesh.position.set(-4, 0, 2); // Adjust for mobile
                textMesh.scale.set(0.5, 0.5, 0.5); // Scale down for mobile
                textMesh2.position.set(-4, 0, 4); // Adjust for mobile
                textMesh2.scale.set(0.5, 0.5, 0.5); // Scale down for mobile
            } else {
                textMesh.position.set(-7, 0, 2); // Adjust for desktop
                //textMesh.position.set(-2, 0, 2); // Adjust for desktop
                textMesh2.position.set(-7, 0, 4); // Adjust for desktop
            }

            textMesh.rotation.set(-Math.PI / 2, 0, 0); // Rotate text to face the camera if necessary
            textMesh2.rotation.set(-Math.PI / 2, 0, 0); // Rotate text to face the camera if necessary

            this.scene.add(textMesh);
            this.scene.add(textMesh2);
        });
    }

    isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
}

export default Text;
