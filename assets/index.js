import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
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
loadLine.to(".screen", { y: "100vh", delay: 1, duration: 0.5, ease: "sine.inOut" });

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

const leftSides = gsap.utils.toArray('.leftSide');
leftSides.forEach(box => {
  gsap.from(box, { 
    x: -1000,
    scrollTrigger: {
      trigger: box,
      start: "top top+=500",
      end: "bottom-=400 bottom",
      scrub: 1
    }
  })
});

const texts = gsap.utils.toArray('.text-left');
texts.forEach(box => {
  gsap.from(box, { 
    y: 1000,
    scrollTrigger: {
      trigger: box,
      start: "top-=1000 top+=700",
      end: "bottom-=1000 bottom",
      scrub: 2
    }
  })
});

gsap.from(".rightSide", {x: 1000, scrollTrigger: {
    trigger: ".rightSide",
    start: "top top+=500",
    end: "bottom-=400 bottom",
    scrub: true,
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

scene.background = null;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

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