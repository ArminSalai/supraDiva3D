import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
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

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.set(6, 12, 28);
camera.lookAt(0, 0, 0);
camera.zoom = 1;
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

const gLight = new THREE.PointLight(0x979DA6, 19 / 3, 300);
gLight.position.set(10, 12, 15);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2E4C3, 3, 200);
yLight.position.set(-15, 12, -21);
yLight.castShadow = true;
scene.add(yLight);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 40,90, 0, 1);
backLight.position.set(-10, -12, 18);
backLight.lookAt(5,0,10)
scene.add(backLight);

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.6);
scene.add(hLight);

const areaLight = new THREE.RectAreaLight(0xe6d1ff, 7, 18, 16);
areaLight.rotation.y +=2;
areaLight.position.set(3, 10, -3);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const secondaryBackLight = new THREE.RectAreaLight(0xffffff, 8, 8, 8);
secondaryBackLight.position.set(10, -15, -10);
secondaryBackLight.lookAt(0, 0, 0);
scene.add(secondaryBackLight);

var played = false;

function play() {
    if(!played)
    {
        let body = document.getElementsByTagName("body");
        played = true;
            let tl = gsap.timeline({}, 
                {smoothChildTiming: true});
            tl.to(body[0], {overflow: "auto"});
    }
};

var mobil;

var dk;
var dva;

const dock = new GLTFLoader()
dock.load("assets/models/dock.glb", function(glb) {
    dk = glb.scene;
    scene.add(dk);
    dk.position.z += 7;
    dk.position.x -= 15;
    dk.position.y -= 1.2;
    dk.rotation.y -= 0.6;
    dk.scale.set(0.2,0.2,0.2);
});

const divaLoader = new GLTFLoader()
divaLoader.load("assets/models/divaGrey.glb", function(glb) {
    dva = glb.scene;
    scene.add(dva);
    dva.position.x -= 11.35;
    dva.position.z = 9.35;
    dva.position.y = 1.95;
    dva.rotation.x += Math.PI/2;
    dva.rotation.z = -0.97;
    dva.scale.set(0.2,0.2,0.2);
});

const loader = new GLTFLoader()
loader.load("assets/models/laptop.glb", function(glb) {
    mobil = glb.scene;
    scene.add(mobil);
    mobil.position.y -= 1.2;
    mobil.position.z += 5;
    mobil.position.x += 10;
    mobil.rotation.y = -2.8;
    mobil.scale.set(3,3,3);
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
    renderer.render(scene, camera);
}

animate();