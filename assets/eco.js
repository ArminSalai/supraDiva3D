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

let Cook;

document.querySelector("#agree").addEventListener("click", function() {
    document.cookie = "clicked; path=/";
    Cook = document.cookie;
    document.querySelector("#cookie").remove();
});

if(played) {
    let loadLine = gsap.timeline({},
        { smoothChildTiming: true });
    loadLine.to(".screen", { y: "100vh", delay:1, duration: 0.5, ease: "sine.inOut" });
}

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = canvas.clientWidth;
let height = window.innerHeight * 0.8;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
camera.position.set(0, 0, 27);
camera.lookAt(0, 0, 0);
camera.zoom = 0.5;
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

const titles = gsap.utils.toArray(".sub-title");
titles.forEach(box => {
    gsap.from(box, {
            y: 100,
            opacity: 0,
            ease: "power4",
            scrollTrigger: {
                trigger: box,
                start: "top-=100 top+=500",
                end: "bottom-=200 bottom",
                scrub: 1
            }
    })
});

const reds = gsap.utils.toArray(".red");
reds.forEach(box => {
    gsap.from(box, {
            yPercent: 100,
            scale: 0,
            scrollTrigger: {
                trigger: box,
                start: "top-=200 top+=700",
                end: "bottom bottom",
                scrub: 1
            }
    })
});

gsap.from("h1", {
    y: 100,
    opacity: 0,
    ease: "power4",
    scrollTrigger: {
        trigger: "h1",
        start: "top-=100 top+=500",
        end: "bottom-=200 bottom",
        scrub: 1
    }
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

if(document.cookie !== "clicked")
    gsap.to("#cookie", {bottom:"0", ease: "power3.inOut", delay: 3});
else
    document.querySelector("#cookie").remove();

const rightSides = gsap.utils.toArray('.rightSide');
rightSides.forEach(box => {
  gsap.from(box, { 
    x: 1000,
    scrollTrigger: {
      trigger: box,
      start: "top top+=500",
      end: "bottom-=400 bottom",
      scrub: 1
    }
  })
});

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

RectAreaLightUniformsLib.init();

const greyLight = new THREE.RectAreaLight(0x979DA6, 55, 15, 15);
greyLight.position.set(18, 22, 17);
greyLight.lookAt(0, 3, 0);
scene.add(greyLight);

const yellowLight = new THREE.RectAreaLight(0xF2EED3, 40, 13, 13);
yellowLight.position.set(-25, 2, 10);
yellowLight.lookAt(0, -10, 0);
scene.add(yellowLight);

const roughnessLight = new THREE.PointLight(0xffffff, 1, 200);
roughnessLight.position.set(0, -20, -3);
scene.add(roughnessLight);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 40, 80, 0, 1);
backLight.position.set(0, 11, -16);
scene.add(backLight);

const hemiLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.5);
scene.add(hemiLight);

var mobil;

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
loader.load("assets/models/eco.glb", function (glb) {
    mobil = glb.scene;
    scene.add(mobil);
    mobil.rotation.x = Math.PI/2;
    mobil.rotation.y = -Math.PI/2;
    mobil.position.y -= 5;
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