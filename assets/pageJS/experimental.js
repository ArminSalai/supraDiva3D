const THREE = await import('https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js');
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { DRACOLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/DRACOLoader.js';
import { gsap } from '../plugins/gsap-core.js';
const CSSPlugin = await import('../plugins/CSSPlugin.min.js');
const CSSRulePlugin = await import('../plugins/CSSRulePlugin.js');
const ScrollTrigger = await import('../plugins/ScrollTrigger.min.js');

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(CSSRulePlugin);

//Switching between light and dark modes
//variables for modes
let mode = "dark";
let navB = document.querySelector("nav");
let backG = document.querySelector("#mainFrame");
let optionT = document.querySelectorAll(".optionText");
//DarkMode
function switchToDark() {
    navB.className = "navbar navbar-expand-lg bg-dark navbar-dark";
    backG.style.background = "linear-gradient(#343a40, #111)";
    document.querySelector("#moon").style.display = "none";
    document.querySelector("#moonW").style.display = "inline";
    document.querySelector(".dropdown-menu").className = "dropdown-menu bg-dark";
    for(var i = 0; i < optionT.length; i++)
      optionT[i].className = "dropdown-item optionText lead text-light"
}
//LightMode
function switchToLight() {
    navB.className = "navbar navbar-expand-lg bg-light navbar-light";
    backG.style.background = "#27BAB8";
    document.querySelector("#moon").style.display = "inline";
    document.querySelector("#moonW").style.display = "none";
    document.querySelector(".dropdown-menu").className = "dropdown-menu bg-light";
    for(var i = 0; i < optionT.length; i++)
      optionT[i].className = "dropdown-item optionText lead text-dark"
}

//Mode switch button function
let darkMode = document.querySelector("#darkMode");
darkMode.addEventListener("click", function() {
  if(mode == "light")
  {
    mode = "dark";
    switchToDark();
  }
  else
  {
    mode = "light";
    switchToLight();
  }
  if(decodeURIComponent(document.cookie).includes("clicked"))
    document.cookie = "Mode=" + mode+ "; path=/; SameSite = None; Secure";
});
//Cookie agreement button
document.querySelector("#agree").addEventListener("click", function() {
  document.cookie = "Aggreed = clicked; path=/; SameSite = None; Secure";
  document.querySelector("#cookie").remove();
});

let cookieText = decodeURIComponent(document.cookie);

if(!(cookieText.includes("clicked")))
    gsap.to("#cookie", {bottom:"0", ease: "power3.inOut", delay: 3});
else
{
  document.querySelector("#cookie").remove();
  let modeData = cookieText.split(";").slice(5);
  mode = modeData;
  if(cookieText.includes("Mode=dark"))
  {
    mode = "dark";
    switchToDark();
  }
  else
  {
    mode = "light";
    switchToLight();
  }
}
//THREE.JS
//Setting up basic variables
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
scene.background = null;

let width = canvas.clientWidth;
let height = canvas.clientHeight;

let camera = new THREE.PerspectiveCamera(50, width / (height), 0.1, 300);
camera.position.set(1, 0.8, 11.1);
camera.lookAt(1, 0, 0);
camera.zoom = ((width*height)/(height*height))/2;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap = true;
THREE.Cache.enabled = true;
//Resize renderer on window resize an window load
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
    width = canvas.clientWidth;
    height = window.innerHeight;
    camera.aspect = width / (height);
    camera.zoom = ((width*height)/(height*height))/2;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
    if(window.innerWidth < 767)
    {
        width = canvas.clientWidth;
        height = window.innerHeight;
        camera.aspect = width / (height);
        camera.zoom = ((width*height)/(height*height))/2;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }
}
//Loading animations
function loadBetweenModels() {
  let gif = document.createElement("img");
  gif.setAttribute("src", "assets/images/loadingAnim.gif");
  gif.setAttribute("id", "loaderLoop");
  let load = document.createElement("div");
  load.setAttribute("class", "load");
  load.appendChild(gif);
  let screen = document.createElement("div");
  screen.setAttribute("class", "screenForObjs d-flex justify-content-center align-items-center");
  screen.appendChild(load);
  let loading = document.createElement("div");
  loading.setAttribute("id", "loading");
  let bDrop = document.querySelector("#mainFrame");
  bDrop.appendChild(screen);
}

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    loadBetweenModels();
};

manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};

//Model and animation setup
let mixer;
let body = document.getElementsByTagName("body");
var model;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/js/libs/draco/');
dracoLoader.preload();

RectAreaLightUniformsLib.init();

const loader = new GLTFLoader(manager);
loader.setDRACOLoader(dracoLoader);
loader.load("assets/models/test.glb", function (glb) {
    mixer = new THREE.AnimationMixer(glb.scene);
    glb.scene.matrixAutoUpdate = false;
    var clip = glb.animations[ 0 ];
    var action = mixer.clipAction( clip );
    action.clampWhenFinished = true;
    action.setLoop( THREE.LoopOnce );
    manager.onLoad = function ( ) {
        let elements = document.getElementsByClassName("screenForObjs");
        while (elements.length > 0) elements[0].remove();
        action.play().reset();
        action.startAt(1);
    };
    mixer.addEventListener( 'finished', function() {
        document.querySelector(".replayScreen").style.visibility = "visible";
        document.querySelector("#replayButton").addEventListener('click', function() {
            action.play().reset();
            document.querySelector(".replayScreen").style.visibility = "hidden";
        })
     });     
    model = glb.scene;
    model.traverse((object) => {
        if (object.isCamera) camera = object;
      });
    camera.aspect = width / (height);
    camera.zoom = ((width*height)/(height*height))/2;
    camera.updateProjectionMatrix();
    scene.add(model);
    body[0].style.overflowY = "auto";
    window.scrollTo(0, 0);
});
//Animation functions
var clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update( clock.getDelta() );
    }
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}
animate();