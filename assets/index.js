import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from './gsap-core.js';
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

let width = window.innerWidth * 0.75;
let height = window.innerHeight * 0.75;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.set(3, 10, 26);
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

const constrols = new OrbitControls(camera, renderer.domElement);
constrols.enableZoom = false;
constrols.enablePan = false;

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
    if(!played)
    {
        let body = document.getElementsByTagName("body");
        played = true;
            let tl = gsap.timeline({}, 
                {smoothChildTiming: true});
            tl.to(body[0], {overflow: "auto"});
    }
};

const loader = new GLTFLoader()
loader.load("assets/models/DivaGrey.glb", function(glb) {
    mobil = glb.scene;
    scene.add(mobil);
    window.scrollTo(0, 0);
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