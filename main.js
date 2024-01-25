import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";

var scene = new THREE.Scene();
var chairFabric;
scene.background = new THREE.Color(0xd3d3d3);
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;
camera.position.y = 0.5;

const gltfloader = new GLTFLoader();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

const p = document.createElement("p");
p.textContent =
  "Chair Fabric: The sun set over the tranquil horizon, casting hues of orange and pink across the sky, painting a serene evening scene.";
// const cPointLabel = new CSS2DObject(p);
// // scene.add(cPointLabel);
// console.log(cPointLabel)
// cPointLabel.position.set(1, 0, 0);
const div = document.createElement('div');
div.appendChild(p);
const divContainer = new CSS2DObject(div);
// scene.add(divContainer);


gltfloader.load(
  "SheenChair.glb",
  function (glb) {
    console.log(glb.scene.children[0]);
    chairFabric = glb.scene.children[0];
    const root = glb.scene;
    scene.add(root);
    // chairFabric.add(cPointLabel);
    divContainer.position.copy(chairFabric.position);
    chairFabric.add(divContainer);
    
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error occured");
  }
);
// cPointLabel.position.copy(chairFabric.position);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25; // adjusts how quickly the controls slow down after a movement
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;



var animate = function () {
  requestAnimationFrame(animate);

  // chairFabric.rotation.x += 0.03;
  // chairFabric.rotation.y += 0.03;
  // chairFabric.rotation.z += 0.03;
  // cPointLabel.rotateX += 0.1;
  // cPointLabel.rotation.x += 0.1;
  // cPointLabel.rotation.y += 0.1;
  // chairFabric.position.x +=0.1;
  // cPointLabel.position.set(chairFabric.position);
  // cPointLabel.position.copy(chairFabric.position);
  // console.log(chairFabric.position+" "+cPointLabel.position);
  chairFabric.position.x +=0.001;
  controls.update();
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
};

animate();
