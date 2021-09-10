const THREE = await import('https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js');
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
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

let Cook;

var header = new Headers();
header.set('Content-Encoding', 'gzip');
header.set('Accept-Encoding', 'gzip');

let mode = "dark";
let navB = document.querySelector("nav");
let backG = document.querySelector("#backGround");
let textC = document.querySelectorAll(".textContent");
let botT = document.querySelectorAll(".botText");
let footText = document.querySelector(".footText");
let footer = document.querySelector("footer");
let endT = document.querySelector(".endText");
let botL = document.querySelectorAll(".botLogos");
let botLW = document.querySelectorAll(".botLogosW");
let optionT = document.querySelectorAll(".optionText");
let icons = document.querySelectorAll(".red");
let hr = document.querySelector("hr");

function switchToDark() {
  navB.className = "navbar navbar-expand-lg bg-dark navbar-dark";
    backG.style.background = "linear-gradient(#343a40, #111)";
    document.querySelector("#moon").style.display = "none";
    document.querySelector("#moonW").style.display = "inline";
    document.querySelector(".dropdown-menu").className = "dropdown-menu bg-dark";
    for(var i = 0; i < textC.length; i++)
      textC[i].className = "textContent row text-light justify-content-center m-0";
    for(var i = 0; i < botT.length; i++)
      botT[i].className = "botText lead bottomText text-light text-center"
    footer.className = "bg-dark";
    footText.className = "footText row ml-5 ml-md-0 flex-column flex-md-row justify-content-center text-light mt-4"
    endT.className = "endText text-light text-right mr-5";
    for(var i = 0; i < botL.length; i++) {
      botL[i].style.display = "none";
      botLW[i].style.display = "inline";
    }
    for(var i = 0; i < optionT.length; i++)
      optionT[i].className = "dropdown-item optionText lead text-light"
      document.documentElement.style.setProperty("--red-theme-color", "rgb(220, 53, 69)");
    for(var i = 0; i < icons.length; i++)
      icons[i].style.backgroundColor = "rgb(220, 53, 69)";
      hr.style.backgroundColor = "rgb(238, 238, 238)";
}

function switchToLight() {
  navB.className = "navbar navbar-expand-lg bg-light navbar-light";
    backG.style.background = "linear-gradient(#eee, #ccc)";
    document.querySelector("#moon").style.display = "inline";
    document.querySelector("#moonW").style.display = "none";
    document.querySelector(".dropdown-menu").className = "dropdown-menu bg-light";
    for(var i = 0; i < textC.length; i++)
      textC[i].className = "textContent row text-dark justify-content-center m-0";
    for(var i = 0; i < botT.length; i++)
      botT[i].className = "botText lead bottomText text-dark text-center"
    footer.className = "bg-light";
    footText.className = "footText row ml-5 ml-md-0 flex-column flex-md-row justify-content-center text-dark mt-4"
    endT.className = "endText text-dark text-right mr-5";
    for(var i = 0; i < botL.length; i++) {
      botL[i].style.display = "inline";
      botLW[i].style.display = "none";
    }
    for(var i = 0; i < optionT.length; i++)
      optionT[i].className = "dropdown-item optionText lead text-dark"
      document.documentElement.style.setProperty("--red-theme-color", "rgb(170, 36, 56)");
    for(var i = 0; i < icons.length; i++)
      icons[i].style.backgroundColor = "rgb(170, 36, 56)";
      hr.style.backgroundColor = "rgb(17, 17, 17)";
}

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

document.querySelector("#agree").addEventListener("click", function() {
    document.cookie = "Aggreed = clicked; path=/; SameSite = None; Secure";
    Cook = document.cookie;
    document.querySelector("#cookie").remove();
});

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

let width = canvas.clientWidth;
let height = window.innerHeight * 0.8;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
camera.position.set(60, 30, 0);
camera.zoom = ((width * height) / (height * height)) / 7;
camera.updateProjectionMatrix();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});

RectAreaLightUniformsLib.init();

function generateGradient() {
  let lessOne;
  let moreOne;
  let lessTwo;
  let moreTwo;
  let lessThree;
  let moreThree;
  var gradients = [0, 2, 3, 4, 5, 6, 7, 8, 9];
  var rand = gradients[Math.floor(Math.random() * gradients.length)];
  if (rand == 0) {
      lessOne = 0;
      moreOne = 0;
      lessTwo = 125;
      moreTwo = 46;
      lessThree = 150;
      moreThree = 83;
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

  if (rand == 5) {
    moreOne = 15;
    lessOne = 44;
    moreTwo = 32;
    lessTwo = 83;
    moreThree = 39;
    lessThree = 100;
  }

  if (rand == 6) {
    moreOne = 55;
    lessOne = 66;
    moreTwo = 59;
    lessTwo = 134;
    moreThree = 68;
    lessThree = 244;
  }

  if (rand == 7) {
    moreOne = 54;
    lessOne = 11;
    moreTwo = 0;
    lessTwo = 135;
    moreThree = 51;
    lessThree = 147;
  }

  if (rand == 8) {
    moreOne = 0;
    lessOne = 232;
    moreTwo = 34;
    lessTwo = 74;
    moreThree = 62;
    lessThree = 74;
  }

  if (rand == 9) {
    moreOne = 72;
    lessOne = 192;
    moreTwo = 0;
    lessTwo = 72;
    moreThree = 72;
    lessThree = 72;
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
            border: "none",
            transformOrigin: "bottom",
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

scene.background = null;

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

THREE.Cache.enabled = true;
renderer.physicallyCorrectLights = true;

const gLight = new THREE.PointLight(0x979DA6, 19 / 4, 300);
gLight.position.set(16, 10, 14);
gLight.castShadow = true;
scene.add(gLight);

const yLight = new THREE.PointLight(0xF2EED3, 10 / 4, 200);
yLight.position.set(-10, 12, -23);
yLight.castShadow = true;
scene.add(yLight);

const roughnessLight1 = new THREE.SpotLight(0xffffff, 5 / 8, 40, 80, 0, 1);
roughnessLight1.position.set(0, -10, -18);
scene.add(roughnessLight1);

const roughnessLight2 = new THREE.SpotLight(0xffffff, 5 / 2, 40, 80, 0, 1);
roughnessLight2.position.set(-40, -5, 5);
roughnessLight2.lookAt(0, 0, 0);
scene.add(roughnessLight2);

const topLight = new THREE.RectAreaLight(0xffddff, 20, 14, 14);
topLight.position.set(-38, 25, 0);
topLight.lookAt(0, 0, 0);
scene.add(topLight);

const backLight = new THREE.SpotLight(0xffffff, 5 / 2, 40, 80, 0, 1);
backLight.position.set(0, -10, 10);
scene.add(backLight);

const hLight = new THREE.HemisphereLight(0xF2D64B, 0x68788C, 0.6);
scene.add(hLight);

const areaLight = new THREE.RectAreaLight(0xffffff, 20, 14, 14);
areaLight.position.set(30, 10, 30);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

const underLight = new THREE.RectAreaLight(0xffffff, 5, 60, 20);
underLight.position.set(0, -30, 0);
underLight.lookAt(0, 0, 0);
underLight.castShadow = true;
scene.add(underLight);

var mobil;

let eco;

let divaRed;

function play() {
    if (!played) {
        let body = document.getElementsByTagName("body");
        played = true;
        let tl = gsap.timeline({},
            { smoothChildTiming: true });
        tl.to(eco.position, { z: "0", duration: 1.5, ease: "power2.inOut" })
            .to(eco.rotation, { y: "0", z: -Math.PI / 2, x: Math.PI / 2, delay: "-1.5", duration: 1.5, ease: "power2.inOut" })
            .to(camera, { zoom: "+=0.2", delay: "-1.5", duration: 1.5, ease: "power1.inOut" })
            .to(eco.position, { y: "15.5", duration: 0.5, ease: "power4.inOut" });
        let tlParalell = gsap.timeline({},
            { smoothChildTiming: true });
        tlParalell.to(divaRed.position, { z: "0", duration: 1.5, ease: "power2.inOut" })
            .to(divaRed.rotation, { y: "0", z: -Math.PI / 2, x: Math.PI / 2, delay: "-1.5", duration: 1.5, ease: "power2.inOut" })
            .to(divaRed.position, { y: "15.5", duration: 0.5, ease: "power4.inOut" })
            .to(body[0], { overflowX: "hidden", overflowY: "auto" });
    }
};

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
    let bDrop = document.querySelector("#backDrop");
    bDrop.appendChild(screen);
  }
  
  const manager = new THREE.LoadingManager();
  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
      loadBetweenModels();
  };
  
  manager.onLoad = function ( ) {
      let elements = document.getElementsByClassName("screenForObjs");
      while (elements.length > 0) elements[0].remove();
      play();
  };
  
  manager.onError = function ( url ) {
      console.log( 'There was an error loading ' + url );
  };

const forEco = new THREE.RectAreaLight(0x979DA6, 20, 20, 20);
forEco.position.set(45, 20, -13);
forEco.lookAt(0, 11, 0);
scene.add(forEco);

const divaLoader = new GLTFLoader(manager)
divaLoader.load("assets/models/Diva.glb", function (glb) {
    divaRed = glb.scene;
    scene.add(divaRed);
    divaRed.position.y += 21;
    divaRed.position.x += 27.3;
    divaRed.position.z += 23.6;
    divaRed.rotation.x += 2.5;
    divaRed.rotation.z -= Math.PI / 2;
});

var played = false;

const ecoLoader = new GLTFLoader(manager)
ecoLoader.load("assets/models/DivaGrey.glb", function (glb) {
    eco = glb.scene;
    scene.add(eco);
    eco.position.y += 19;
    eco.position.x += 32.3;
    eco.position.z -= 28.6;
    eco.rotation.x += 0.5;
    eco.rotation.z -= Math.PI / 2;
});

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/js/libs/draco/');
dracoLoader.preload();

const loader = new GLTFLoader(manager);
loader.setDRACOLoader(dracoLoader);
loader.load("assets/models/dock.glb", function (glb) {
    mobil = glb.scene;
    scene.add(mobil);
    mobil.matrixAutoUpdate = false;
    mobil.rotation.y = Math.PI;
    mobil.updateMatrix();
    window.scrollTo(0, 0);
});



function animate() {
    requestAnimationFrame(animate);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

animate();