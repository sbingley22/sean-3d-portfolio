import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { AnimationMixer, AnimationClip } from 'three'
import glb from '../assets/mi.glb?url'

export function setupThreeScene(element) {
  const scene = new THREE.Scene()
  scene.background = null

  const camera = new THREE.PerspectiveCamera(75, element.clientWidth / element.clientHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(element.clientWidth, element.clientHeight)
  renderer.shadowMap.enabled = true

  function resizeRenderer() {
    const width = element.clientWidth
    const height = element.clientHeight
    renderer.setSize(width, height)
  }
  resizeRenderer()
  window.addEventListener("resize", resizeRenderer)

  if (element) element.appendChild(renderer.domElement)
  else document.body.appendChild(renderer.domElement)

  // For rendering HTML
  const css3DRenderer = new CSS3DRenderer();
  css3DRenderer.setSize(window.innerWidth, window.innerHeight);
  css3DRenderer.domElement.style.position = 'absolute';
  css3DRenderer.domElement.style.top = 0;
  css3DRenderer.domElement.style.left = 0;
  css3DRenderer.domElement.style.pointerEvents = 'none';
  css3DRenderer.domElement.style.userSelect = 'none';

  if (element) element.appendChild(css3DRenderer.domElement)
  else document.body.appendChild(css3DRenderer.domElement)

  return { scene, camera, renderer, css3DRenderer }
}

export function Lighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.99)
  directionalLight.position.set(0, 4, 0)
  directionalLight.castShadow = true
  scene.add(directionalLight)
}

export function Controls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 2, 5.9)
  controls.update()
  controls.minPolarAngle = Math.PI / 2
  controls.maxPolarAngle = Math.PI / 2

  return controls
}

export function LoadModel(scene) {
  let mixer
  let model
  let animations
  let lastAnim

  const loader = new GLTFLoader()
  loader.load(glb, function (gltf) {
    //console.log(gltf)
    model = gltf.scene
    scene.add(model)

    animations = gltf.animations
    mixer = new AnimationMixer(model)
    playAnimationByName("start")

    initializeAnimations()
  })

  const playAnimationByName = (animationName) => {
    if (!mixer) return
    if (!animations) return
  
    const action = mixer.clipAction(AnimationClip.findByName(animations, animationName))
    if (action) {
      action.reset().fadeIn(0.2).play()
      if (lastAnim) lastAnim.fadeOut(0.2)
      lastAnim = action
    }
    else {
      console.log("cannot find action")
      return
    }
  }

  const initializeAnimations = () => {
    //const action = mixer.clipAction(THREE.AnimationClip.findByName(animations, "mumWave"))
    //action.loop = THREE.LoopOnce
    //action.clampWhenFinished = true
    
    mixer.addEventListener('finished', () => {
      //console.log("Animation finished", lastAnim)
      if (lastAnim._clip.name == "mumWave") playAnimationByName("Idle");
    });
  }

  const updateMixer = (delta) => {
    if (!mixer) return
    mixer.update(delta)
  }

  const getModel = () => {
    if (!model) return
    return model
  }

  return { getModel, updateMixer, playAnimationByName }

}

const getNodebyName = (node, name) => {
  if (node.name == name) return node

  for (const child of node.children) {
    const foundNode = getNodebyName(child, name)
    if (foundNode) return foundNode
  }

  return null
}
