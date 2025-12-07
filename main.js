import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);
scene.fog = new THREE.Fog(0x333333, 200, 400);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(60, 50, 80);
camera.lookAt(15, 0, 30);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(15, 5, 30);
controls.autoRotate = false;
controls.autoRotateSpeed = 2;
controls.damping = true;
controls.dampingFactor = 0.05;
controls.update();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 150, 50);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xaabbff, 0x806020, 0.5);
scene.add(hemisphereLight);

// Grid helper
const gridHelper = new THREE.GridHelper(100, 50);
gridHelper.position.y = -0.1;
scene.add(gridHelper);

// Room data
const roomData = [
  { name: 'Parking/Terrace', x: 5, z: 55, width: 10, depth: 10, height: 3, color: 0xD3D3D3 },
  { name: 'Kitchen', x: 5, z: 45, width: 10, depth: 10, height: 10, color: 0xFFFACD },
  { name: 'Store Room', x: 5, z: 33.5, width: 10, depth: 13, height: 10, color: 0xF5F5F5 },
  { name: 'Puja Room', x: 5, z: 24.5, width: 10, depth: 5, height: 10, color: 0xFFFACD },
  { name: 'Master Bed 1', x: 5.5, z: 14, width: 11, depth: 14, height: 10, color: 0xDEB887 },
  { name: 'Bath 1', x: 5, z: 5, width: 10, depth: 4, height: 10, color: 0xFFE4C4 },
  { name: 'Living Hall', x: 21.5, z: 51, width: 17, depth: 18, height: 10, color: 0xFFFFFE },
  { name: 'Bath 3', x: 25, z: 39.5, width: 10, depth: 5, height: 10, color: 0xFFE4C4 },
  { name: 'Staircase', x: 25, z: 32, width: 10, depth: 10, height: 10, color: 0xFAFAF0 },
  { name: 'Guest Room', x: 25, z: 22, width: 10, depth: 10, height: 10, color: 0xDEB887 },
  { name: 'Bedroom 2', x: 24, z: 13.75, width: 12, depth: 13.5, height: 10, color: 0xDEB887 },
  { name: 'Bath 2', x: 25, z: 5, width: 10, depth: 4, height: 10, color: 0xFFE4C4 },
  { name: 'Corridor', x: 15, z: 30, width: 6, depth: 60, height: 10, color: 0xFFFFF0 },
];

const roomMeshes = [];

// Create rooms as boxes
roomData.forEach((room, index) => {
  const geometry = new THREE.BoxGeometry(room.width, room.height, room.depth);
  const material = new THREE.MeshStandardMaterial({
    color: room.color,
    metalness: 0.1,
    roughness: 0.8,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(room.x, room.height / 2, room.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { name: room.name, ...room };

  scene.add(mesh);
  roomMeshes.push(mesh);

  // Add edges
  const edges = new THREE.EdgesGeometry(geometry);
  const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x444444 }));
  mesh.add(wireframe);
});

// Add boundary walls
const boundaryColor = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.2, roughness: 0.9 });

// North wall
const northWall = new THREE.Mesh(new THREE.BoxGeometry(30, 10, 0.5), boundaryColor);
northWall.position.set(15, 5, 60.25);
scene.add(northWall);

// South wall
const southWall = new THREE.Mesh(new THREE.BoxGeometry(30, 10, 0.5), boundaryColor);
southWall.position.set(15, 5, -0.25);
scene.add(southWall);

// West wall
const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 10, 60), boundaryColor);
westWall.position.set(-0.25, 5, 30);
scene.add(westWall);

// East wall
const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 10, 60), boundaryColor);
eastWall.position.set(30.25, 5, 30);
scene.add(eastWall);

// Ground
const groundGeo = new THREE.PlaneGeometry(40, 70);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x90EE90, metalness: 0, roughness: 0.9 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
ground.receiveShadow = true;
scene.add(ground);

// Populate room list
const roomListContent = document.getElementById('room-list-content');
roomData.forEach(room => {
  const roomDiv = document.createElement('div');
  roomDiv.className = 'room-item';
  roomDiv.innerHTML = \`
    <div class="room-name">\${room.name}</div>
    <div class="room-size">\${room.width}' × \${room.depth}' = \${(room.width * room.depth).toFixed(0)} sq ft</div>
  \`;
  roomListContent.appendChild(roomDiv);
});

// Animation loop
let frameCount = 0;
let lastTime = Date.now();

function animate() {
  requestAnimationFrame(animate);

  frameCount++;
  const currentTime = Date.now();
  if (currentTime >= lastTime + 1000) {
    const fps = frameCount;
    document.getElementById('fps').textContent = fps;
    frameCount = 0;
    lastTime = currentTime;
  }

  // Update camera position display
  const camPos = camera.position;
  document.getElementById('camera-pos').textContent = 
    \`\${camPos.x.toFixed(0)}, \${camPos.y.toFixed(0)}, \${camPos.z.toFixed(0)}\`;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Double-click to reset view
window.addEventListener('dblclick', () => {
  controls.target.set(15, 0, 30);
  camera.position.set(60, 50, 80);
  controls.update();
});
