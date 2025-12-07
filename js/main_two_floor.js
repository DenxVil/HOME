import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);
scene.fog = new THREE.Fog(0x1a1a2e, 200, 400);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(80, 60, 100);
camera.lookAt(15, 10, 30);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(15, 10, 30);
controls.autoRotate = false;
controls.damping = true;
controls.dampingFactor = 0.05;
controls.update();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
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

const hemisphereLight = new THREE.HemisphereLight(0xaabbff, 0x806020, 0.6);
scene.add(hemisphereLight);

// Grid helper
const gridHelper = new THREE.GridHelper(100, 50);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

// GROUND FLOOR ROOMS (Y = 0-10)
const groundFloorRooms = [
  { name: 'Main Hall (GF)', x: 15, z: 30, width: 30, depth: 60, height: 10, color: 0xEEEEEE, yOffset: 0, opacity: 0.25 },
];

// FIRST FLOOR ROOMS (Y = 10-20)
const firstFloorRooms = [
  { name: 'Terrace', x: 5, z: 55, width: 10, depth: 10, height: 10, color: 0xCCCCCC, yOffset: 10 },
  { name: 'Family Hall', x: 21.5, z: 51, width: 17, depth: 18, height: 10, color: 0xFFF3B0, yOffset: 10 },
  { name: 'Kitchen', x: 5, z: 45, width: 10, depth: 10, height: 10, color: 0xFFCC99, yOffset: 10 },
  { name: 'Store Room', x: 5, z: 33.5, width: 10, depth: 13, height: 10, color: 0xDDDDDD, yOffset: 10 },
  { name: 'Puja Room', x: 5, z: 24.5, width: 10, depth: 5, height: 10, color: 0xFFFACD, yOffset: 10 },
  { name: 'Utility Duct', x: 2, z: 20, width: 4, depth: 4, height: 10, color: 0x999999, yOffset: 10, opacity: 0.6 },
  { name: 'Master Bed 1', x: 5.5, z: 14, width: 11, depth: 14, height: 10, color: 0xB3E5FC, yOffset: 10 },
  { name: 'Bathroom 1', x: 5, z: 5, width: 10, depth: 4, height: 10, color: 0x90CAF9, yOffset: 10 },
  { name: 'Corridor', x: 15, z: 30, width: 6, depth: 60, height: 0.3, color: 0xFFFFF0, yOffset: 10, opacity: 0.4 },
  { name: 'Bathroom 3', x: 25, z: 39.5, width: 10, depth: 5, height: 10, color: 0x90CAF9, yOffset: 10 },
  { name: 'Staircase', x: 25, z: 32, width: 10, depth: 10, height: 10, color: 0xE1BEE7, yOffset: 10 },
  { name: 'Guest Room', x: 25, z: 22, width: 10, depth: 10, height: 10, color: 0xB3E5FC, yOffset: 10 },
  { name: 'Bedroom 2', x: 24, z: 13.75, width: 12, depth: 13.5, height: 10, color: 0xB3E5FC, yOffset: 10 },
  { name: 'Bathroom 2', x: 25, z: 5, width: 10, depth: 4, height: 10, color: 0x90CAF9, yOffset: 10 },
  { name: 'Rear Setback', x: 15, z: 1.5, width: 30, depth: 3, height: 0.2, color: 0xA9A9A9, yOffset: 10, opacity: 0.5 },
];

const allRooms = [...groundFloorRooms, ...firstFloorRooms];
const roomMeshes = [];

allRooms.forEach((room) => {
  const geometry = new THREE.BoxGeometry(room.width, room.height, room.depth);
  const material = new THREE.MeshStandardMaterial({
    color: room.color,
    metalness: 0.1,
    roughness: 0.8,
    transparent: room.opacity !== undefined,
    opacity: room.opacity || 0.9,
  });

  const mesh = new THREE.Mesh(geometry, material);
  const yBase = (room.yOffset || 10) + room.height / 2;
  mesh.position.set(room.x, yBase, room.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { name: room.name, ...room };

  scene.add(mesh);
  roomMeshes.push(mesh);

  const edges = new THREE.EdgesGeometry(geometry);
  const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x444444 }));
  mesh.add(wireframe);
});

const boundaryColor = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.2, roughness: 0.9 });

const northWall = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 0.5), boundaryColor);
northWall.position.set(15, 10, 60.25);
scene.add(northWall);

const southWall = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 0.5), boundaryColor);
southWall.position.set(15, 10, -0.25);
scene.add(southWall);

const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 20, 60), boundaryColor);
westWall.position.set(-0.25, 10, 30);
scene.add(westWall);

const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 20, 60), boundaryColor);
eastWall.position.set(30.25, 10, 30);
scene.add(eastWall);

const midFloorSlab = new THREE.Mesh(new THREE.BoxGeometry(30.5, 0.5, 60.5), new THREE.MeshStandardMaterial({ color: 0x444444 }));
midFloorSlab.position.set(15, 9.75, 30);
scene.add(midFloorSlab);

const groundGeo = new THREE.PlaneGeometry(40, 70);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x6B8E23, metalness: 0, roughness: 0.9 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
ground.receiveShadow = true;
scene.add(ground);

const roomListContent = document.getElementById('room-list-content');
const displayRooms = allRooms.filter(r => !['Utility Duct', 'Rear Setback', 'Corridor'].includes(r.name));

displayRooms.forEach(room => {
  const roomDiv = document.createElement('div');
  roomDiv.className = 'room-item';
  const floor = room.yOffset === 0 ? '[GF]' : '[FF]';
  roomDiv.innerHTML = \`
    <div class="room-name">\${room.name} \${floor}</div>
    <div class="room-size">\${room.width}' × \${room.depth}' = \${(room.width * room.depth).toFixed(0)} sq ft</div>
  \`;
  roomListContent.appendChild(roomDiv);
});

let frameCount = 0;
let lastTime = Date.now();

function animate() {
  requestAnimationFrame(animate);

  frameCount++;
  const currentTime = Date.now();
  if (currentTime >= lastTime + 1000) {
    document.getElementById('fps').textContent = frameCount;
    frameCount = 0;
    lastTime = currentTime;
  }

  const camPos = camera.position;
  document.getElementById('camera-pos').textContent = 
    \`\${camPos.x.toFixed(0)}, \${camPos.y.toFixed(0)}, \${camPos.z.toFixed(0)}\`;

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

window.addEventListener('dblclick', () => {
  controls.target.set(15, 10, 30);
  camera.position.set(80, 60, 100);
  controls.update();
});
