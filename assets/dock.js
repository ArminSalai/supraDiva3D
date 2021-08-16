import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {RectAreaLightUniformsLib} from 'https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap, _colorStringFilter } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(CSSRulePlugin);

let loadLine = gsap.timeline({}, 
    {smoothChildTiming: true});
loadLine.to("#sq1", {rotationZ: 45, x: "7vw", y: "3vw", duration:0.5, ease: "sine.out"})
        .to("#sq2", {rotationZ: -45, x: "-7vw", y: "3vw", delay: "-0.5", duration:0.5, ease: "sine.out"})
        .to("#sq1", {x: "0vw", duration:0.5, ease: "sine.out"})
        .to("#sq2", {x: "0vw", delay: "-0.5", duration:0.5, ease: "sine.out"})
        .to(".screen", {y: "100vh", duration:0.5, ease:"sine.inOut"});


const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = window.innerWidth * 0.99;
let height = window.innerHeight * 0.75;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.set(58, 30, -10);
camera.lookAt(0, 0, 0);
camera.zoom = 0.3;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

RectAreaLightUniformsLib.init();

function generateGradient() {
    let lessOne = 28;
    let moreOne = 0;
    let lessTwo = 181;
    let moreTwo = 8;
    let lessThree = 224;
    let moreThree = 81;
    var gradients = [0, 1, 2, 3, 4];
    var rand = gradients[Math.floor(Math.random()*gradients.length)];
    if(rand == 0){
        lessOne = 28;
        moreOne = 0;
        lessTwo = 181;
        moreTwo = 8;
        lessThree = 224;
        moreThree = 81;
    }
    if(rand == 1){
        moreOne = 213;
        lessOne = 218;
        moreTwo = 51;
        lessTwo = 174;
        moreThree = 105;
        lessThree = 81;
    }
    if(rand == 2){
        lessOne = 37;
        moreOne = 165;
        lessTwo = 208;
        moreTwo = 90;
        lessThree = 199;
        moreThree = 240;
    }
    if(rand == 3){
        lessOne = 14;
        moreOne = 12;
        lessTwo = 174;
        moreTwo = 116;
        lessThree = 87;
        moreThree = 117;
    }
    if(rand == 4) {
        lessOne = 115;
        moreOne = 28;
        lessTwo = 18;
        moreTwo = 28;
        lessThree = 81;
        moreThree = 28;
    }

    document.getElementById("backDrop").style.backgroundImage = 'radial-gradient(rgb(' + lessOne + ',' + lessTwo + ',' + lessThree + ')30%, rgb(' + moreOne + ',' + moreTwo + ',' + moreThree + '))';
}

generateGradient();


scene.background = null;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

const constrols = new OrbitControls(camera, renderer.domElement);
constrols.enablePan = false;

let zoomButton = document.querySelector("#zoomButton");
zoomButton.addEventListener("click", function() {
    if(constrols.enableZoom == true) {
        zoomButton.style.backgroundColor = "#aa2438";
        constrols.enableZoom = false;
    }
    else {
        zoomButton.style.backgroundColor = "#343a4067"
        constrols.enableZoom = true;
    }
});

let panButton = document.querySelector("#panButton");
panButton.addEventListener("click", function() {
    if(constrols.enablePan == true) {
        panButton.style.backgroundColor = "#aa2438";
        constrols.enablePan = false;
    }
    else {
        panButton.style.backgroundColor = "#343a4067"
        constrols.enablePan = true;
    }
});

let rotateButton = document.querySelector("#rotateButton");
rotateButton.addEventListener("click", function() {
    if(constrols.enableRotate == true) {
        rotateButton.style.backgroundColor = "#aa2438";
        constrols.enableRotate = false;
    }
    else {
        rotateButton.style.backgroundColor = "#343a4067"
        constrols.enableRotate = true;
    }
});

const gLight = new THREE.PointLight(0x979DA6, 19 / 4, 300);
gLight.position.set(36, 10, 14);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2EED3, 10 / 4, 200);
yLight.position.set(-10, 12, -23);
yLight.castShadow = true;
scene.add(yLight);

const roughnessLight1 = new THREE.SpotLight(0xffffff, 5 / 8, 40, 80, 0, 1);
roughnessLight1.position.set(0, -10, -18);
scene.add(roughnessLight1);

const roughnessLight2 = new THREE.SpotLight(0xffffff, 5 / 4, 40, 80, 0, 1);
roughnessLight2.position.set(0, -10, 20);
roughnessLight2.rotateOnWorldAxis("x", Math.PI);
scene.add(roughnessLight2);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 40, 80, 0, 1);
backLight.position.set(0, -10, 10);
scene.add(backLight);

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.6);
scene.add(hLight);

const portLight = new THREE.PointLight(0xFFFFFF, 2, 200);
portLight.position.set(-20, -2, 40);
scene.add(portLight);


const areaLight = new THREE.RectAreaLight(0xffffff, 20, 14, 14);
areaLight.position.set(30, 10, 30);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

var mobil;

let eco;

let divaRed;


const forEco = new THREE.RectAreaLight(0x979DA6, 20, 20, 20);
forEco.position.set(45, 20, -13);
forEco.lookAt(0, 11, 0);
scene.add(forEco);

const divaLoader = new GLTFLoader()
divaLoader.load("assets/models/Diva.glb", function(glb) {
    divaRed = glb.scene;
    scene.add(divaRed);
    divaRed.position.y += 21;
    divaRed.position.x += 27.3;
    divaRed.position.z += 23.6;
    divaRed.rotation.x += 2.5;
    divaRed.rotation.z -= Math.PI/2;
});

var played = false;

const ecoLoader = new GLTFLoader()
ecoLoader.load("assets/models/DivaGrey.glb", function(glb) {
    eco = glb.scene;
    scene.add(eco);
    eco.position.y += 19;
    eco.position.x += 32.3;
    eco.position.z -= 28.6;
    eco.rotation.x += 0.5;
    eco.rotation.z -= Math.PI/2;
});

function play() {
    if(!played)
    {
        let body = document.getElementsByTagName("body");
        played = true;
        let tl = gsap.timeline({}, 
            {smoothChildTiming: true});
        tl.to(eco.position, {z: "0", duration: 1.5, ease: "power2.inOut"})
          .to(eco.rotation, {y: "0", z: -Math.PI/2, x: Math.PI/2, delay: "-1.5", duration: 1.5, ease: "power2.inOut"})
          .to(camera, {zoom: "0.45", delay: "-1.5", duration: 1.5, ease:"power1.inOut"})
          .to(eco.position, {y: "15.5", duration: 0.5, ease: "power4.inOut"});
        let tlParalell = gsap.timeline({}, 
            {smoothChildTiming: true});
        tlParalell.to(divaRed.position, {z: "0", duration: 1.5, ease: "power2.inOut"})
          .to(divaRed.rotation, {y: "0", z: -Math.PI/2, x: Math.PI/2, delay: "-1.5", duration: 1.5, ease: "power2.inOut"})
          .to(divaRed.position, {y: "15.5", duration: 0.5, ease: "power4.inOut"})
          .to(body[0], {overflow: "auto"});
    }
};


const loader = new GLTFLoader()
loader.load("assets/models/dock.glb", function(glb) {
    mobil = glb.scene;
    scene.add(mobil);
    mobil.rotation.y = Math.PI;
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