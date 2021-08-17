import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(CSSRulePlugin);

let loadLine = gsap.timeline({},
    { smoothChildTiming: true });
loadLine.to("#sq1", { rotationZ: 45, x: "7vw", y: "3vw", duration: 0.5, ease: "power1.inOut" })
    .to("#sq2", { rotationZ: -45, x: "-7vw", y: "3vw", delay: "-0.5", duration: 0.5, ease: "power1.inOut" })
    .to("#sq1", { x: "0vw", duration: 0.5, ease: "power2.inOut" })
    .to("#sq2", { x: "0vw", delay: "-0.5", duration: 0.5, ease: "power2.inOut" })
    .to(".screen", { y: "100vh", duration: 0.5, ease: "sine.inOut" });

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = canvas.clientWidth;
let height = canvas.clientHeight;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
camera.position.set(60, 18, -15);
camera.lookAt(0, 0, 0);
camera.zoom = ((width * height) / (height * height)) / 7;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

scene.background = null;

function generateGradient() {
    let lessOne = 28;
    let moreOne = 0;
    let lessTwo = 181;
    let moreTwo = 8;
    let lessThree = 224;
    let moreThree = 81;
    var gradients = [0, 1, 2, 3, 4];
    var rand = gradients[Math.floor(Math.random() * gradients.length)];
    if (rand == 0) {
        lessOne = 28;
        moreOne = 0;
        lessTwo = 181;
        moreTwo = 8;
        lessThree = 224;
        moreThree = 81;
    }
    if (rand == 1) {
        moreOne = 213;
        lessOne = 218;
        moreTwo = 51;
        lessTwo = 174;
        moreThree = 105;
        lessThree = 81;
    }
    if (rand == 2) {
        lessOne = 37;
        moreOne = 165;
        lessTwo = 208;
        moreTwo = 90;
        lessThree = 199;
        moreThree = 240;
    }
    if (rand == 3) {
        lessOne = 14;
        moreOne = 12;
        lessTwo = 174;
        moreTwo = 116;
        lessThree = 87;
        moreThree = 117;
    }
    if (rand == 4) {
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


renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

const constrols = new OrbitControls(camera, renderer.domElement);
constrols.enablePan = false;
constrols.enableZoom = false;

function resizeRendererToDisplaySize(renderer) {
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

resizeRendererToDisplaySize(renderer);

let zoomButton = document.querySelector("#zoomButton");
zoomButton.addEventListener("click", function () {
    if (constrols.enableZoom == true) {
        zoomButton.style.backgroundColor = "#aa2438";
        constrols.enableZoom = false;
    }
    else {
        zoomButton.style.backgroundColor = "#343a4067"
        constrols.enableZoom = true;
    }
});

let panButton = document.querySelector("#panButton");
panButton.addEventListener("click", function () {
    if (constrols.enablePan == true) {
        panButton.style.backgroundColor = "#aa2438";
        constrols.enablePan = false;
    }
    else {
        panButton.style.backgroundColor = "#343a4067"
        constrols.enablePan = true;
    }
});

let rotateButton = document.querySelector("#rotateButton");
rotateButton.addEventListener("click", function () {
    if (constrols.enableRotate == true) {
        rotateButton.style.backgroundColor = "#aa2438";
        constrols.enableRotate = false;
    }
    else {
        rotateButton.style.backgroundColor = "#343a4067"
        constrols.enableRotate = true;
    }
});

const gLight = new THREE.PointLight(0x979DA6, 19 / 4, 300);
gLight.position.set(19, 10, 50);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2EED3, 10 / 2, 200);
yLight.position.set(-15, 12, -58);
yLight.castShadow = true;
scene.add(yLight);

const backLight = new THREE.SpotLight(0xffffff, 5, 100, 120, 0, 1);
backLight.position.set(-20, -30, 80);
backLight.lookAt(0, 0, -30);
scene.add(backLight);

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 2);
scene.add(hLight);

RectAreaLightUniformsLib.init();

const portLightFront = new THREE.RectAreaLight(0xffffff, 6, 30, 3);
portLightFront.rotation.y = Math.PI / 2;
portLightFront.position.set(50, -2, 0);
scene.add(portLightFront);

const portLightBack = new THREE.RectAreaLight(0xffffff, 18, 30, 3);
portLightBack.rotation.y = -Math.PI / 2;
portLightBack.position.set(-60, -2, 0);
scene.add(portLightBack);

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
divaLoader.load("assets/models/cordlessTouch.glb", function (glb) {
    divaRed = glb.scene;
    scene.add(divaRed);
    divaRed.scale.y = 1.45;
    divaRed.position.y += 19;
    divaRed.position.x += 12.6;
    divaRed.position.z += 31.6;
    divaRed.rotation.x += 2.5;
    divaRed.rotation.z -= Math.PI / 2 - 0.25;
});

var played = false;

const ecoLoader = new GLTFLoader()
ecoLoader.load("assets/models/cordlessMulti.glb", function (glb) {
    eco = glb.scene;
    scene.add(eco);
    eco.scale.y = 1.45;
    eco.position.y += 19;
    eco.position.x += 4.6;
    eco.position.z -= 28.6;
    eco.rotation.x -= 2.4;
    eco.rotation.z -= Math.PI / 2 - 0.5;
});

function play() {
    if (!played) {
        let body = document.getElementsByTagName("body");
        played = true;
        let tl = gsap.timeline({},
            { smoothChildTiming: true });
        tl.to(eco.position, { x: "21.6", z: "-9.52", duration: 1.5, ease: "power2.inOut" })
            .to(eco.rotation, { y: "0", z: -Math.PI / 2, x: "0", delay: "-1.5", duration: 1.4, ease: "power2.inOut" })
            .to(camera, { zoom: "+=0.2", delay: "-1.5", duration: 1.5, ease: "power2.inOut" })
            .to(eco.position, { y: "13.5", duration: 0.5, ease: "power4.inOut" });
        let tlParalell = gsap.timeline({},
            { smoothChildTiming: true });
        tlParalell.to(divaRed.position, { x: "21.6", z: "9.52", duration: 1.5, ease: "power2.inOut" })
            .to(divaRed.rotation, { y: "0", z: -Math.PI / 2, x: "0", delay: "-1.5", duration: 1.4, ease: "power2.inOut" })
            .to(divaRed.position, { y: "13.5", duration: 0.5, ease: "power4.inOut" })
            .to(body[0], { overflowX: "hidden", overflowY: "auto" });
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/supraCharge.glb", function (glb) {
    mobil = glb.scene;
    scene.add(mobil);
    window.scrollTo(0, 0);
}, function (xhr) {
    function remove() {
        let loadScreen = document.getElementById("loadingScreen");
        loadScreen.remove();
    }
    if ((xhr.loaded / xhr.total) == 1) {
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