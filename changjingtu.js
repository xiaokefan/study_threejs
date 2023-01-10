import * as THREE from "./build/three.module.js"

function main() {
    const canvas = document.querySelector("#c")
    // 将dom对象传给THREEjs渲染
    const renderer = new THREE.WebGLRenderer({ canvas })

    const fov = 40; // 相机角度
    const aspect = 2 // 相机的高宽比
    const near = 0.1 // 相机的近平面和远平面
    const far = 100

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1) // 相机以z轴正方向为上方,默认以y轴正方向为上方
    camera.lookAt(0, 0, 0) // lookAt 函数让相机从他的位置看向lookAt函数传的位置

    const scene = new THREE.Scene() // 定义场景

    // 定义灯光
    const color = 0xFFFFFF // 发光颜色
    const intensity = 3 // 发光强度
    const light = new THREE.PointLight(color, intensity) // 灯光对象
    scene.add(light) // 创景中加载灯光

    const objects = []

    const radius = 1 // 半径
    const widthSegments = 6
    const heightSegments = 6
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments) // 设置几何体

    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 }) // 设置材质

    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial) // 创建网格对象

    sunMesh.scale.set(5, 5, 5) // 设置网格对象的缩放

    scene.add(sunMesh) // 场景中加入网格对象

    objects.push(sunMesh) // 将网格对象push到objects数组中

    // 设置渲染的分辨率和窗口分辨率一致
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
            renderer.setSize(width, height, false)
        }
        return needResize
    }

    // 渲染函数
    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            // 设置相机的宽高比与canvas相同，让网格对象不会被拉伸
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix();
        }

        // 遍历网格对象数组,设置网格对象的旋转角度
        objects.forEach((obj) => {
            obj.rotation.y = time
        })

        // 渲染场景
        renderer.render(scene, camera)

        requestAnimationFrame(render)

    }
    requestAnimationFrame(render)

}
main()