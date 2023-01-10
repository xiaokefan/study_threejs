
import * as THREE from "./build/three.module.js"
function main() {
    // 将canvas 对象传给webgl渲染器
    const canvas = document.querySelector("#c")
    const renderer = new THREE.WebGLRenderer({ canvas })
    // 创建一个摄像机
    const fov = 75;
    const aspect = 2
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2

    // 创建一个场景
    const scene = new THREE.Scene()

    // 创建一个球体
    const radius = 7;  // ui: radius
    const widthSegments = 12;  // ui: widthSegments
    const heightSegments = 8;  // ui: heightSegments
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // 创建一个材质
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
    scene.add(sunMesh);
}
