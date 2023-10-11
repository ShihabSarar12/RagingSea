import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import testVertexShader from "./shaders/vertex.glsl";
import testFragmentShader from "./shaders/fragment.glsl";

const gui = new dat.GUI();

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const debugObject = {};
debugObject.surfaceColor = "#5AC9E1";
debugObject.deepColor = "#0643C5";

const geometry = new THREE.PlaneGeometry(1, 1, 512, 512);
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uBigWavesFrequency: { value: new THREE.Vector2(8, 4) },
    uTime: { value: 0 },
    uBigWavesSpeed: { value: 1.25 },
    uBigWavesElevation: { value: 0.17 },
    uSmallIterations: { value: 4 },
    uColorOffset: { value: 0.25 },
    uColorMultiplier: { value: 3.8 },
    uSmallWavesFrequency: { value: 5 },
    uSmallWavesSpeed: { value: 1 },
    uSmallWavesElevation: { value: 0.15 },
    uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    uDeepColor: { value: new THREE.Color(debugObject.deepColor) },
  },
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(Math.PI / 2, 0, -Math.PI / 12);
mesh.position.set(0, -0.3, 0);
scene.add(mesh);

gui
  .add(material.uniforms.uColorOffset, "value")
  .min(0)
  .max(1)
  .step(0.01)
  .name("ColorOffset");
gui
  .add(material.uniforms.uColorMultiplier, "value")
  .min(0)
  .max(10)
  .step(0.1)
  .name("uColorMultiplier");
gui
  .add(material.uniforms.uBigWavesFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.1)
  .name("uBigWaveFrequencyX");
gui
  .add(material.uniforms.uBigWavesFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.1)
  .name("uBigWaveFrequencyY");
gui
  .add(material.uniforms.uBigWavesSpeed, "value")
  .min(0)
  .max(10)
  .step(0.1)
  .name("uBigWavesSpeed");
gui
  .add(material.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(1.3)
  .step(0.01)
  .name("uBigWavesElevation");
gui
  .add(material.uniforms.uSmallWavesFrequency, "value")
  .min(0)
  .max(100)
  .step(0.1)
  .name("uSmallWavesFrequency");
gui
  .add(material.uniforms.uSmallWavesSpeed, "value")
  .min(0)
  .max(5)
  .step(0.01)
  .name("uSmallWavesSpeed");
gui
  .add(material.uniforms.uSmallWavesElevation, "value")
  .min(0)
  .max(5)
  .step(0.01)
  .name("uSmallWavesElevation");
gui.addColor(debugObject, "surfaceColor").onChange(() => {
  material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
});
gui.addColor(debugObject, "deepColor").onChange(() => {
  material.uniforms.uDeepColor.value.set(debugObject.deepColor);
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, 0.5, 1.5);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
