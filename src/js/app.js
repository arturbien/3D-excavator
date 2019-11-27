import * as THREE from 'three';
import { TweenLite } from 'gsap';
import Annotations from './partials/Annotations';
import DomEvents from './partials/domevents';

const OrbitControls = require('three-orbit-controls')(THREE);
const GLTFLoader = require('three-gltf-loader');

let camera, scene, renderer, orbitControls, domEvents, annotationsGroup;
const VIEW_ANGLE = 50;

const progressBar = document.getElementById('loader__progress-bar');
const loader = document.getElementById('loader');
const loaderTop = document.getElementById('loader__top-half');
const loaderBottom = document.getElementById('loader__bottom-half');
const canvasContainer = document.getElementById('canvas-container');
const annotations = new Annotations('canvas-container');
let hovering = 0;
THREE.Cache.enabled = true;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    canvasContainer.offsetWidth / canvasContainer.offsetHeight,
    0.01,
    1000
  );
  camera.position.z = -70;
  camera.position.x = -70;
  camera.position.y = 30;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.physicallyBasedShading = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

  canvasContainer.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResizeCallback);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.rotateSpeed = 0.5;
  orbitControls.minDistance = 0;
  orbitControls.maxDistance = 150;

  domEvents = new DomEvents.DomEvents(camera, renderer.domElement);

  scene = new THREE.Scene();
  scene.position.y = -42;
  scene.rotation.y = Math.PI;

  loadGLTF();
  initLights();
  annotationsGroup = new THREE.Group();
  annotations.createTHREEAnnotations(annotationsGroup);
  scene.add(annotationsGroup);
  annotationsGroup.children.forEach(sprite => {
    let initialScale = sprite.scale.x;
    domEvents.addEventListener(sprite, 'mouseover', function(event) {
      event.stopPropagation();
      hovering++;
      canvasContainer.style.cursor = 'pointer';
      sprite.scale.x = sprite.scale.y = sprite.scale.z = initialScale * 1.5;
    });
    domEvents.addEventListener(sprite, 'mouseout', function(event) {
      event.stopPropagation();
      if (hovering === 1) {
        canvasContainer.style.cursor = 'default';
      }
      hovering--;
      sprite.scale.x = sprite.scale.y = sprite.scale.z = initialScale;
    });
    domEvents.addEventListener(sprite, 'click', function(e) {
      console.log(e);
      sprite.callback();
    });
  });
}

function animate() {
  requestAnimationFrame(animate);
  orbitControls.update();
  renderer.render(scene, camera);
}

function loadGLTF() {
  const modelLoader = new GLTFLoader();
  modelLoader.load(
    './models/small.glb',
    function(data) {
      scene.position.y = -100;
      scene.add(data.scene);
      setTimeout(function() {
        TweenLite.to(loaderTop, 1, {
          y: '-100%',
          onComplete: () => {
            loader.style.display = 'none';
          }
        });
        TweenLite.to(loaderBottom, 1, { y: '100%' });
        TweenLite.to(scene.position, 1, { y: -22 });
        TweenLite.to(scene.rotation, 1, { y: Math.PI / 2 });
      }, 500);
    },
    function(xhr) {
      let total = 13807112;
      if (xhr.lengthComputable) {
        total = xhr.total;
      } else {
        total = 13807112;
      }
      // console.log( Math.round(( xhr.loaded / total * 100 )) + '% loaded' );
      TweenLite.to(progressBar, 0.5, { scaleX: 1 - xhr.loaded / total });
    },
    // called when loading has errors
    function(error) {
      console.log('An error happened during loading', error);
    }
  );
}
function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight1.position.set(55, 10, 7.5);
  directionalLight1.castShadow = false;
  scene.add(directionalLight1);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight2.position.set(-55, 10, 7.5);
  directionalLight2.castShadow = false;
  scene.add(directionalLight2);
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight3.position.set(0, 10, 75);
  directionalLight3.castShadow = false;
  scene.add(directionalLight3);
  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight4.position.set(0, 40, -85);
  directionalLight4.castShadow = false;
  scene.add(directionalLight4);
}

function onWindowResizeCallback() {
  const w = canvasContainer.offsetWidth;
  const h = canvasContainer.offsetHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
