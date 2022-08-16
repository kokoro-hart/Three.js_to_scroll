import './style.css';
import * as THREE from 'three';

// canvas
const canvas: any = document.querySelector('#webgl');

// シーン
const scene = new THREE.Scene();

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// カメラ
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// レンダラー
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(devicePixelRatio);

// ジオメトリ
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 0.5, 10);

scene.add(box, torus);

// アニメーション
const animation = () => {
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
};

animation();

// リサイズ処理
addEventListener('resize', () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(devicePixelRatio);
});
