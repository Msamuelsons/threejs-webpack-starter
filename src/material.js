import "./style.css"
import * as THREE from "three"
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene()

// Lighs
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 2, 2)
scene.add(ambientLight, pointLight)

// TextureLoader
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load("/texture/color.jpg")
const matcapTexture = textureLoader.load("/texture/mat2.png")
const bumbTexture = textureLoader.load("/texture/bump.jpg")

const displacementTexture = textureLoader.load("/texture/displacementMap.jpg")

//Resizing
window.addEventListener("resize", () => {
    //Update Size
    aspect.width = window.innerWidth
    aspect.height = window.innerHeight

    //New Aspect Ratio
    camera.aspect = aspect.width / aspect.height
    camera.updateProjectionMatrix()

    //New RendererSize
    renderer.setSize(aspect.width, aspect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Mesh
const geometry = new THREE.PlaneBufferGeometry(1, 1, 12, 12)

const material = new THREE.MeshStandardMaterial()
//material.wireframe = true => Deixa com a formação de triângulos
//material.color = new THREE.Color("skyblue")
//material.transparent = true
//material.opacity = 0.4
//material.matcap = matcapTexture
material.side = THREE.DoubleSide
//material.shininess = 200
//material.specular = new THREE.Color("green")
//material.metalness = 0.35
//material.roughness = 0.5
material.map = colorTexture
material.displacementMap = displacementTexture
//material.bumpMap = bumbTexture
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 1
scene.add(camera)

// Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.05

//Clock Class
const clock = new THREE.Clock()

const animate = () => {
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Update Controls
    orbitControls.update()

    //Renderer
    renderer.render(scene, camera)

    //RequestAnimationFrame
    window.requestAnimationFrame(animate)
}
animate()
