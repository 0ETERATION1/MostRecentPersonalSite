import * as THREE from 'three';

console.log("CHECK!")

// this holds all of our three.js objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const geometry1 = new THREE.BoxGeometry( 2, 2, 2 );

const material = new THREE.MeshBasicMaterial( { color: "red" } );
const material1 = new THREE.MeshBasicMaterial( { color: "yellow" } );

const cube1 = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry1, material1 );

scene.add( cube1 );
scene.add( cube2 );

camera.position.z = 5;

function animate() {

	cube1.rotation.x += 0.01;
	cube1.rotation.y += 0.01;

	renderer.render( scene, camera );

}