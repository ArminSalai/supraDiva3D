import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(CSSRulePlugin);

let loadLine = gsap.timeline({},
    { smoothChildTiming: true });
loadLine.to("#sq1", { rotationZ: 45, x: "7vw", y: "3vw", duration: 0.5, ease: "sine.out" })
    .to("#sq2", { rotationZ: -45, x: "-7vw", y: "3vw", delay: "-0.5", duration: 0.5, ease: "sine.out" })
    .to("#sq1", { x: "0vw", duration: 0.5, ease: "sine.out" })
    .to("#sq2", { x: "0vw", delay: "-0.5", duration: 0.5, ease: "sine.out" })
    .to(".screen", { y: "100vh", duration: 0.5, ease: "sine.inOut" });

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
let body = document.getElementsByTagName("body");

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

let width = canvas.clientWidth;
let height = canvas.clientHeight;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
camera.position.set(3, 10, 26);
camera.lookAt(0, 0, 0);
camera.zoom = ((width*height)/(height*height))/4;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

scene.background = null;

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

const gLight = new THREE.PointLight(0x979DA6, 19 / 2, 300);
gLight.position.set(19, 10, 14);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2EED3, 10 / 2, 200);
yLight.position.set(-20, 12, -1);
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

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.45);
scene.add(hLight);


const areaLight = new THREE.RectAreaLight(0xffffff, 20, 14, 14);
areaLight.position.set(-5, 10, -5);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

var played = false;

var mobil;

function play() {
    if (!played) {
        played = true;
        let tl = gsap.timeline({},
            { smoothChildTiming: true });
        tl.to(body[0], { overflowX: "hidden", overflowY: "auto" });
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/DivaGrey.glb", function (glb) {
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
        setTimeout(play, 1500);
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();