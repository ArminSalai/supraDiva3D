import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {RectAreaLightUniformsLib} from 'https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(CSSRulePlugin);

let loadLine = gsap.timeline({}, 
    {smoothChildTiming: true});
    loadLine.to("#sq1", {rotationZ: 45, x: "7vw", y: "3vw", duration:0.5, ease: "power1.inOut"})
        .to("#sq2", {rotationZ: -45, x: "-7vw", y: "3vw", delay: "-0.5", duration:0.5, ease: "power1.inOut"})
        .to("#sq1", {x: "0vw", duration:0.5, ease: "power2.inOut"})
        .to("#sq2", {x: "0vw", delay: "-0.5", duration:0.5, ease: "power2.inOut"})
        .to(".screen", {y: "100vh", duration:0.5, ease:"sine.inOut"});

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = window.innerWidth * 0.75;
let height = window.innerHeight * 0.75;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
camera.position.set(60, 18, -15);
camera.lookAt(0, 0, 0);
camera.zoom = 0.5;
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

const yLight = new THREE.PointLight(0xF2EED3, 10 / 2, 200);
yLight.position.set(-15, 12, -58);
yLight.castShadow = true;
scene.add(yLight);

const backLight = new THREE.SpotLight(0xffffff, 5 , 100, 120, 0, 1);
backLight.position.set(-20, -30, 80);
backLight.lookAt(0, 0, -30);
scene.add(backLight);


const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 2);
scene.add(hLight);


const areaLight = new THREE.RectAreaLight(0xffffff, 20, 14, 14);
areaLight.position.set(-5, 12, 45);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const forEco = new THREE.RectAreaLight(0x979DA6, 20, 40, 20);
forEco.position.set(45, 20, 0);
forEco.lookAt(0, 11, 0);
scene.add(forEco);

var mobil;

let divaRed;

let eco;

const divaLoader = new GLTFLoader()
divaLoader.load("assets/models/cordlessTouch.glb", function(glb) {
    divaRed = glb.scene;
    scene.add(divaRed);
    divaRed.scale.y = 1.45;
    divaRed.position.y += 19;
    divaRed.position.x += 12.6;
    divaRed.position.z += 31.6;
    divaRed.rotation.x += 2.5;
    divaRed.rotation.z -= Math.PI/2-0.25;
});

var played = false;

const ecoLoader = new GLTFLoader()
ecoLoader.load("assets/models/cordlessMulti.glb", function(glb) {
    eco = glb.scene;
    scene.add(eco);
    eco.scale.y = 1.45;
    eco.position.y += 19;
    eco.position.x += 4.6;
    eco.position.z -= 28.6;
    eco.rotation.x -= 2.4;
    eco.rotation.z -= Math.PI/2-0.5;
});

function play() {
    if(!played)
    {
        let body = document.getElementsByTagName("body");
        played = true;
        let tl = gsap.timeline({}, 
            {smoothChildTiming: true});
        tl.to(eco.position, {x: "21.6", z: "-9.52", duration: 1.5, ease: "power2.inOut"})
        .to(eco.rotation, {y: "0", z: -Math.PI/2, x: "0", delay: "-1.5", duration: 1.4, ease: "power2.inOut"})
        .to(camera, {zoom: "0.6", delay: "-1.5", duration: 1.5, ease:"power2.inOut"})
        .to(eco.position, {y: "13.5", duration: 0.5, ease: "power4.inOut"});
        let tlParalell = gsap.timeline({}, 
            {smoothChildTiming: true});
        tlParalell.to(divaRed.position, {x: "21.6", z: "9.52", duration: 1.5, ease: "power2.inOut"})
        .to(divaRed.rotation, {y: "0", z: -Math.PI/2, x: "0", delay: "-1.5", duration: 1.4, ease: "power2.inOut"})
        .to(divaRed.position, {y: "13.5", duration: 0.5, ease: "power4.inOut"})
        .to(body[0], {overflow: "auto"});
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/supraCharge.glb", function(glb) {
    mobil = glb.scene;
    scene.add(mobil);
    window.scrollTo(0,0);
}, function(xhr) {
    function remove() {
        let loadScreen = document.getElementById("loadingScreen");
        loadScreen.remove();
    }
    if((xhr.loaded / xhr.total) == 1)
    {
        setTimeout(remove, 1500);
        setTimeout(play, 2000);
    }
});



function animate() {
    requestAnimationFrame(animate);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

animate();