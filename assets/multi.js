import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';
import * as ScrollTrigger from './ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
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

function generateGradient() {
    let lessOne = 28;
    let moreOne = 0;
    let lessTwo = 181;
    let moreTwo = 8;
    let lessThree = 224;
    let moreThree = 81;
    var gradients = [0, 1, 2, 3 ,4];
    var rand = gradients[Math.floor(Math.random() * gradients.length)];
    if (rand == 0) {
        lessOne = 0;
        moreOne = 0;
        lessTwo = 125;
        moreTwo = 46;
        lessThree = 150;
        moreThree = 83;
    }
    if (rand == 1) {
        lessOne = 158;
        moreOne = 98;
        lessTwo = 10;
        moreTwo = 6;
        lessThree = 30;
        moreThree = 20;
    }
    if (rand == 2) {
        lessOne = 123;
        moreOne = 56;
        lessTwo = 0;
        moreTwo = 2;
        lessThree = 143;
        moreThree = 69;
    }
    if (rand == 3) {
        lessOne = 0;
        moreOne = 0;
        lessTwo = 191;
        moreTwo = 120;
        lessThree = 165;
        moreThree = 102;
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

gsap.from(".upScroll", {autoAlpha: 0, scrollTrigger: {
    trigger: "#PageContainer",
    start: "top top+=400",
    end: "end+=800 +=800",
    scrub: true
}});

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

RectAreaLightUniformsLib.init();

scene.background = null;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const constrols = new OrbitControls(camera, document.querySelector(".touchable"));
constrols.enablePan = false;

function resizeRendererToDisplaySize(renderer) {
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

resizeRendererToDisplaySize(renderer);

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    let width = canvas.clientWidth;
    let height = window.innerHeight * 0.8;
    camera.aspect = width / (height);
    camera.zoom = ((width*height)/(height*height))/4;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
}

document.querySelector(".topIcon").addEventListener("click", function() {gsap.to(window, { scrollTo: 0, duration: 1, ease:"power2.inOut" });});

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

const gLight = new THREE.PointLight(0x979DA6, 19 / 3, 300);
gLight.position.set(10, 12, 15);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2E4C3, 3, 200);
yLight.position.set(-15, 12, -21);
yLight.castShadow = true;
scene.add(yLight);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 40, 90, 0, 1);
backLight.position.set(-10, -12, 18);
backLight.lookAt(5, 0, 10)
scene.add(backLight);

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.6);
scene.add(hLight);

const areaLight = new THREE.RectAreaLight(0xe6d1ff, 4, 18, 16);
areaLight.rotation.y += 2;
areaLight.position.set(3, 10, -3);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const secondaryBackLight = new THREE.RectAreaLight(0xffffff, 8, 8, 8);
secondaryBackLight.position.set(10, -15, -10);
secondaryBackLight.lookAt(0, 0, 0);
scene.add(secondaryBackLight);

var mobil;

var played = false;

function play() {
    if (!played) {
        let body = document.getElementsByTagName("body");
        played = true;
        let tl = gsap.timeline({},
            { smoothChildTiming: true });
        tl.to(body[0], { overflowX: "hidden", overflowY: "auto" });
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/Multi.glb", function (glb) {
    mobil = glb.scene;
    scene.add(mobil);
    mobil.rotation.y = -2.3;
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
    renderer.render(scene, camera);
}

animate();