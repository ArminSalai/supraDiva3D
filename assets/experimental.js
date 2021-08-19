import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
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
loadLine.to("#sq1", { rotationZ: 45, x: "7vw", y: "3vw", duration: 0.5, ease: "power1.inOut" })
    .to("#sq2", { rotationZ: -45, x: "-7vw", y: "3vw", delay: "-0.5", duration: 0.5, ease: "power1.inOut" })
    .to("#sq1", { x: "0vw", duration: 0.5, ease: "power2.inOut" })
    .to("#sq2", { x: "0vw", delay: "-0.5", duration: 0.5, ease: "power2.inOut" })
    .to(".screen", { y: "100vh", duration: 0.5, ease: "sine.inOut" });

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = canvas.clientWidth;
let height = window.innerHeight;

let camera = new THREE.PerspectiveCamera(50, width / (height), 0.1, 300);
camera.position.set(1, 0.8, 11.1);
camera.lookAt(1, 0, 0);
camera.zoom = ((width*height)/(height*height))/2;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

RectAreaLightUniformsLib.init();

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
    let height = window.innerHeight;
    camera.aspect = width / (height);
    camera.zoom = ((width*height)/(height*height))/2;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
}

scene.background = null;

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;

var played = false;
var mobil;

let mixer;
let body = document.getElementsByTagName("body");

function play() {
    if (!played) {
        played = true;
        let tl = gsap.timeline({},
            { smoothChildTiming: true });
        tl.to(body[0], { overflowX: "hidden", overflowY: "auto" });
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/test.glb", function (glb) {
    mixer = new THREE.AnimationMixer(glb.scene);
    glb.animations.forEach((clip) => { mixer.clipAction(clip).play(); });
    mobil = glb.scene;
    mobil.traverse((object) => {
        if (object.isCamera) camera = object;
      });
    camera.aspect = width / (height);
    camera.zoom = ((width*height)/(height*height))/2;
    camera.updateProjectionMatrix();
    scene.add(mobil);
    body[0].style.overflowY = "auto";
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
    if (mixer) {
        mixer.setTime((window.pageYOffset / ((height * 2) - 76)) * 1.9);
    }
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

animate();

document.getElementById("mainFrame").onclick = function show(event) {
    if ((event.clientX / width < 0.5) && ((window.pageYOffset / ((window.innerHeight * 2) - 76)) > 2.33)) {
        let clickTimeLine = gsap.timeline({},
            { smoothChildTiming: true });
        clickTimeLine.to(window, { scrollTo: (window.pageYOffset / ((window.innerHeight * 2) - 76)) * 1200, duration: 1, ease: "power2.in" })
            .to(window, { scrollTo: 0, duration: 0 });
    }
}