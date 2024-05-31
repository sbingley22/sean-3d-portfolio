import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { AnimationMixer, AnimationClip } from 'three'
import glb from '../assets/mi.glb?url'
import Html from './Html'

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
    //camera.aspect = width / height
    //console.log(camera)
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
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.99)
  directionalLight.position.set(0, 4, 0)
  directionalLight.castShadow = true
  scene.add(directionalLight)
}

export function Controls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 7, 0)
  controls.update()
  //controls.minPolarAngle = Math.PI / 2
  //controls.maxPolarAngle = Math.PI / 2

  return controls
}

export function LoadModel(scene, infoBox) {
  let mixer
  let model
  let animations
  let lastAnim

  let agent
  let html
  let safeDoor
  let safeButtons = []
  let doom

  const loader = new GLTFLoader()
  loader.load(glb, function (gltf) {
    console.log(gltf)
    model = gltf.scene
    scene.add(model)

    animations = gltf.animations
    mixer = new AnimationMixer(model)
    playAnimationByName("start")

    initializeAnimations()

    scene.children.forEach( child => {
      if (child.type == "Mesh") {
        child.frustumCulled = false
      } else if (child.type == "Group") {
        child.children.forEach( grandchild => {
          grandchild.frustumCulled = false
        })
      }
    })

    // Set raycast layers
    model.traverse( child => {
      child.layers.set(0)
    })

    agent = scene.getObjectByName("Adam")
    agent.layers.set(1)

    agent.children.forEach(child => {
      child.frustumCulled = false
      child.layers.set(1)
    })

    scene.getObjectByName("rope").frustumCulled = false

    scene.getObjectByName("Monitor").children.forEach(child => {
      if (child.material.name == "screen") {
        child.layers.set(1)
        html = Html(child, infoBox)
        html.cssObject.visible = false
      }
    })

    safeDoor = scene.getObjectByName("SafeDoor")
    safeDoor.layers.set(1)

    scene.getObjectByName("Keypad").children.forEach( (button) => {
      if (button.name.includes("SafeButton00")) {
        safeButtons.push(button)
        button.layers.set(1)
      }
    } )

    doom = scene.getObjectByName("Doom")
    doom.layers.set(1)
    const doomScale = 0.75
    doom.scale.x *= doomScale
    doom.scale.y *= doomScale
    doom.scale.z *= doomScale
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
    const oneShots = ["drop", "toSafe"]
    oneShots.forEach( shot => {
      const action = mixer.clipAction(THREE.AnimationClip.findByName(animations, shot))
      action.loop = THREE.LoopOnce
      action.clampWhenFinished = true
    })
    
    mixer.addEventListener('finished', () => {
      //console.log("Animation finished", lastAnim)
      if (lastAnim._clip.name == "drop") playAnimationByName("idle")
      else if (lastAnim._clip.name == "toSafe") playAnimationByName("idleSafe")
    })
  }

  const updateMixer = (delta) => {
    if (!mixer) return
    mixer.update(delta)
  }

  const getModel = () => {
    if (!model) return
    return model
  }

  const getHtml = () => {
    if (!html) return
    return html
  }

  const updateSafeButtons = (combo) => {
    if (!safeButtons) return
    safeButtons.forEach( (button, index) => {
      if (combo[index]) button.material.color.g = 1
      else button.material.color.g = 0.3
    })
  }

  const getSafeDoor = () => {
    if (!safeDoor) return

    return safeDoor
  }

  return { getHtml, getModel, getSafeDoor, updateMixer, playAnimationByName, updateSafeButtons }
}

export function moveCamera(camera, targetPosition, alpha) {
  camera.position.lerp(targetPosition, alpha)
  if (camera.position.distanceTo(targetPosition) < alpha * 2) return true
  return false
}

export function rotateCamera(camera, targetQuaternion, alpha) {
  camera.quaternion.slerp(targetQuaternion, alpha)
  if (camera.quaternion.angleTo(targetQuaternion) < alpha) return true
  return false
}

export function targetControls(controls, targetPosition, alpha) {
  //console.log(controls)
  controls.target.lerp(targetPosition, alpha)
  if (controls.target.distanceTo(targetPosition) < alpha * 2) return true
  return false
}

const getNodebyName = (node, name) => {
  if (node.name == name) return node

  for (const child of node.children) {
    const foundNode = getNodebyName(child, name)
    if (foundNode) return foundNode
  }

  return null
}
