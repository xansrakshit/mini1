import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

gltfloader.load(
  "SheenChair.glb",
  function (glb) {
    console.log(glb.scene.children[0]);
    chairFabric = glb.scene.children[0];
    const root = glb.scene;
    scene.add(root);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error occured");
  }
);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25; // adjusts how quickly the controls slow down after a movement
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

var animate = function () {
  requestAnimationFrame(animate);

  // chairFabric.rotation.x += 0.1;
  // chairFabric.rotation.y += 0.1;
  controls.update();
  renderer.render(scene, camera);
};

animate();
