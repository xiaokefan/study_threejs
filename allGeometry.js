import * as THREE from "./build/three.module.js"
function main() {
    // 获取canvas元素
    const canvas = document.querySelector("#geometry")
    // 将canvas传给three.js
    const renderer = new THREE.WebGLRenderer({ canvas })

    // 设置相机
    const fov = 75
    const aspect = 2;
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camear.position.z = 2

    // 创建一个场景
    const scene = new THREE.Scene()

    // 创建几何体
    const radius = 7;  // ui: radius
    const segments = 24;  // ui: segments
    const geometry = new THREE.CircleGeometry(radius, segments);


    // 创建一个基本材质并设置颜色.
    const material = new THREE.MeshPhongMaterial({ color: "0x44aa88" })

    // 创建一个网格对象
    const cube = new THREE.Mesh(geometry, material)

    // 将网格对象添加到场景中
    scene.add(cube)

    // 创建一盏平行光
    const color = 0xFFFFFF
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)

    // 设置场景render的渲染分辨率. 绘图缓冲区尺寸 
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    // 大型建议用第一种
    // function resizeRendererToDisplaySize(renderer) {
    //     const canvas = renderer.domElement;
    //     const pixelRatio = window.devicePixelRatio;
    //     const width = canvas.clientWidth * pixelRatio | 0;
    //     const height = canvas.clientHeight * pixelRatio | 0;
    //     const needResize = canvas.width !== width || canvas.height !== height;
    //     if (needResize) {
    //         renderer.setSize(width, height, false);
    //     }
    //     return needResize;
    // }
    // 用一个渲染循环函数 requestAnimationFrame 让立方体旋转
    function render(time) {
        time *= 0.001 // 将时间单位变为秒

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * 0.1
            const rot = time * speed
            cube.rotation.x = rot
            cube.rotation.y = rot
        })
        // 指定的宽高比会出现在dom页面变大变小的时候网格对象也跟着变形.所以需要宽高比与canvas的宽高比一致
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
        }

        cube.rotation.x = time
        cube.rotation.y = time

        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}