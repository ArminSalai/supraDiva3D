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
camera.position.set(60, 30, -15);
camera.lookAt(0, 12, 0);
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

gsap.from(".rightSide", {x: 1000, scrollTrigger: {
    trigger: ".rightSide",
    start: "top top+=500",
    end: "bottom-=400 bottom",
    scrub: true,
}});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

const constrols = new OrbitControls(camera, document.querySelector(".touchable"));
constrols.enablePan = false;
constrols.target.set(0, 12, 0);

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
    camera.zoom = ((width*height)/(height*height))/7;
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