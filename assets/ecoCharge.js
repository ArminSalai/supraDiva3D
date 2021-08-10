import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {RectAreaLightUniformsLib} from 'https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap } from './gsap-core.js';

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = window.innerWidth * 0.75;
let height = window.innerHeight * 0.75;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
camera.position.set(60, 24, -15);
camera.lookAt(0, 0, 0);
camera.zoom = 0.45;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

RectAreaLightUniformsLib.init();

scene.background = null;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

const constrols = new OrbitControls(camera, renderer.domElement);
constrols.enableZoom = false;
constrols.enablePan = false;

const gLight = new THREE.PointLight(0x979DA6, 19 / 4, 300);
gLight.position.set(19, 10, 50);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2EED3, 10 / 4, 200);
yLight.position.set(-15, 12, -58);
yLight.castShadow = true;
scene.add(yLight);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 100, 120, 0, 1);
backLight.position.set(-20, -30, 80);
backLight.lookAt(0, 0, -30);
scene.add(backLight);


const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 1.4);
scene.add(hLight);


const areaLight = new THREE.RectAreaLight(0xffffff, 20, 14, 14);
areaLight.position.set(-5, 12, 45);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const forEco = new THREE.RectAreaLight(0xffffff, 20, 20, 20);
forEco.position.set(45, 20, -13);
forEco.lookAt(0, 11, 0);
scene.add(forEco);

var mobil;

let eco;

var played = false;

const ecoLoader = new GLTFLoader()
ecoLoader.load("assets/models/ecoWithoutString.glb", function(glb) {
    eco = glb.scene;
    scene.add(eco);
    eco.scale.set(0.83,0.83,0.83);
    eco.position.y += 13;
    eco.position.x += 26.1;
    eco.position.z -= 28.6;
    eco.rotation.x -= 2.4;
    eco.rotation.z -= Math.PI/2;
    canvas.onclick = function() {
        if(!played)
        {
            played = true;
            let tl = gsap.timeline({}, 
                {smoothChildTiming: true});
            tl.to(eco.position, {z: "-10.6", duration: 1.5, ease: "power2.inOut"})
            .to(eco.rotation, {y: "0", z: -Math.PI/2, x: "0", delay: "-1.5", duration: 1.5, ease: "power2.inOut"})
            .to(camera, {zoom: "0.6", delay: "-1.5", duration: 1.5, ease:"power1.inOut"})
            .to(eco.position, {y: "9.8", duration: 0.5, ease: "power4.inOut"});
        }
    };
}, function(xhr) {
    console.log(xhr.loaded / xhr.total * 100 + "% betolve");
});


const loader = new GLTFLoader()
loader.load("assets/models/ecoCharger.glb", function(glb) {
    mobil = glb.scene;
    scene.add(mobil);
}, function(xhr) {
    console.log(xhr.loaded / xhr.total * 100 + "% betolve");
});



function animate() {
    requestAnimationFrame(animate);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

animate();