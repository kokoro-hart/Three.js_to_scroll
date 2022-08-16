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

let scrollAmount = 0;
// スクロール量の計算
document.body.onscroll = () => {
  scrollAmount =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
    100;
  console.log(scrollAmount);
};

// 線形補完
function loop(x, y, a) {
  return (1 - a) * x + a * y;
}

function scaleAmount(start, end) {
  return (scrollAmount - start) / (end - start);
}

// スクロールアニメーション
const animationScript = [];
animationScript.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z = loop(-15, 2, scaleAmount(0, 40));
    torus.position.z = loop(10, -20, scaleAmount(0, 40));
  },
});

animationScript.push({
  start: 40,
  end: 60,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.rotation.z = loop(1, Math.PI, scaleAmount(40, 60));
  },
});

animationScript.push({
  start: 60,
  end: 80,
  function() {
    camera.lookAt(box.position);
    camera.position.x = loop(0, 15, scaleAmount(60, 80));
    camera.position.y = loop(1, 15, scaleAmount(60, 80));
    camera.position.z = loop(10, 25, scaleAmount(60, 80));
  },
});

animationScript.push({
  start: 80,
  end: 100,
  function() {
    camera.lookAt(box.position);
  },
});

// スクロールアニメーションの実行
function playScrollAnimation() {
  animationScript.forEach((animation) => {
    if (scrollAmount >= animation.start && scrollAmount < animation.end) animation.function();
  });
}
const animation = () => {
  requestAnimationFrame(animation);
  playScrollAnimation();
  renderer.render(scene, camera);
  box.rotation.x += 0.02;
  box.rotation.y += 0.02;
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
