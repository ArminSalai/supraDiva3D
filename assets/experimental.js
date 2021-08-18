import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { gsap } from './gsap-core.js';
import * as CSSPlugin from './CSSPlugin.js';
import * as CSSRulePlugin from './CSSRulePlugin.js';

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
let height = canvas.clientHeight;

let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
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

/*const gLight = new THREE.PointLight(0x979DA6, 19 / 3, 300);
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

const areaLight = new THREE.RectAreaLight(0xe6d1ff, 7, 18, 16);
areaLight.rotation.y += 2;
areaLight.position.set(3, 10, -3);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const secondaryBackLight = new THREE.RectAreaLight(0xffffff, 8, 8, 8);
secondaryBackLight.position.set(10, -15, -10);
secondaryBackLight.lookAt(0, 0, 0);
scene.add(secondaryBackLight);*/

var played = false;
var mobil;

let mixer;
let clock = new THREE.Clock();


const loader = new GLTFLoader()
loader.load("assets/models/test.glb", function (glb) {
    mixer = new THREE.AnimationMixer(glb.scene);
    glb.animations.forEach((clip) => { mixer.clipAction(clip).play(); });
    mobil = glb.scene;
    mobil.traverse((object) => {
        if (object.isCamera) camera = object;
      });
    scene.add(mobil);
    let body = document.getElementsByTagName("body");
    body[0].style.overflowY = "auto";
    window.scrollTo(0, 0);
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