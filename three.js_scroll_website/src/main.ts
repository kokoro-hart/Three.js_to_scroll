import './style.css';
import * as THREE from 'three';

// canvas

const canvas: any = document.querySelector('#webgl');

//シーン
const scene = new THREE.Scene();

// サイズ
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

// アニメーション
const animation = () => {
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
};

animation();

// リサイズイベント
addEventListener('resize', () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(devicePixelRatio);
});
