import './style.css'
import * as THREE from 'three'
import { Controls, Lighting, LoadModel, moveCamera, rotateCamera, setupThreeScene, targetControls } from './src/Scene'
import InfoBox from './src/InfoBox'
import Briefing from './src/Briefing'
import Mute from './src/Mute'
import Return from './src/Return'

const app = document.querySelector('#app')

const { scene, camera, renderer, css3DRenderer } = setupThreeScene(app)

const controls = Controls(camera, renderer)

Lighting(scene)

const clock = new THREE.Clock(true)

const hitBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1.5), 
  new THREE.MeshStandardMaterial({ 
    color: "green", 
    transparent: true, 
    opacity: 0,
    //opacity: 0.5,
  })
)
hitBox.position.set(0,6,-0.5)
hitBox.name = "hitbox"
hitBox.layers.set(1)
scene.add(hitBox)

const infoBox = InfoBox(app)

const model = LoadModel(scene, infoBox)

let stage = "start"
let camMoving = false
let camRotating = false
let camTargeting = false
const camMovePos = new THREE.Vector3()
const camMoveTarget = new THREE.Vector3()
const camMoveQuaternion = new THREE.Quaternion()
const camMoveEuler = new THREE.Euler(0, Math.PI/2, 0)

camera.position.set(2,4,2)
camera.layers.enable(1)
controls.enablePan = false
controls.enableRotate = true
controls.enableZoom = false
controls.minPolarAngle = Math.PI * 2 / 4
controls.maxPolarAngle = Math.PI * 3 / 4

const bgm = document.querySelector('#bgm')
bgm.volume = 0.5
Briefing(app, bgm)

const muted = Mute(app)
const returnButton = Return(app)

let safeDoorOpen = false
const safeButtons = [false,false,false,false,false,false,false,false,false]

const updateSafeButtons = (button) => {
  safeButtons[button] = !safeButtons[button]

  if (!model) return
  model.updateSafeButtons(safeButtons)

  const correctCombination = [true, false, true, false, true, true, false, false, true]
  if (arraysEqual(correctCombination, safeButtons)) {
    //console.log("Safe Open")
    safeDoorOpen = true
    setTimeout(()=>{
      safeDoorOpen = false
    }, 2000)
  }
}

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

// Click raycasters
const raycastClick = (event) => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const canvasBounds = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1
  mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  raycaster.layers.set(1)

  const intersects = raycaster.intersectObjects(scene.children, true)

  if (intersects.length > 0) {
    const iObject = intersects[0].object
    const iParent = iObject.parent
    console.log("object: ", iObject.name, "parent: ", iParent.name)

    if (iObject.name == "hitbox") {
      if (stage == "start") {
        setTimeout(()=>{
          infoBox.newText("Click and drag to look around.")
        }, [3000])
        infoBox.newText("His file should be on that computer.")
        model.playAnimationByName("drop")
        stage = "idle"

        camMoving = true
        camTargeting = true
        camMovePos.set(1.5, 2, -1.5)
        camMoveTarget.set(0, 1, 0)
        
        controls.enableRotate = false
        controls.minPolarAngle = Math.PI * 1 / 4
        controls.maxPolarAngle = Math.PI * 2.2 / 4
      }
    }
    else if (iObject.material.name == "screen") {
      if (stage == "idle") {
        model.playAnimationByName("computer")
        stage = "computer"
        setTimeout(()=>{
          model.getHtml().cssObject.visible = true
          infoBox.newText("")
        }, 2000)

        returnButton.showReturn()

        camMoving = true
        camTargeting = true
        camMovePos.set(0, 1.3, 0)
        camMoveTarget.set(0, 1.3, 0.5)
        controls.enableRotate = false
      }
    }
    else if (iObject.name == "SafeDoor") {
      if (stage == "idle") {
        model.playAnimationByName("toSafe")
        stage = "safe"

        returnButton.showReturn()

        camMoving = true
        camTargeting = true
        camMovePos.set(1.5, 0.5, 0)
        camMoveTarget.set(0, 0.25, 0.5)
        controls.enableRotate = false
      }
    }
    else if (iObject.name.includes("SafeButton00")) {
      if (stage == "safe") {
        const lastChar = iObject.name.slice(-1)
        const lastDigit = parseInt(lastChar, 10)
        //console.log(lastDigit)
        updateSafeButtons(lastDigit)
      }
    }
    else if (iObject.name == "Doom") {
      if (stage == "safe") {
        infoBox.newText("An old copy of Doom? Why would this be here? Try running it on that computer.")
        model.getHtml().setDoomCopy(true)
        iObject.visible = false
      }
    }
  }
}
renderer.domElement.addEventListener('click', raycastClick)

// Render loop
function animate() {
  requestAnimationFrame(animate)

  var delta = clock.getDelta()

  // Camera Transitions
  if (camMoving) {
    if (moveCamera(camera, camMovePos, 0.02)) {
      camMoving = false
    }
  }
  if (camRotating) {
    if (rotateCamera(camera, camMoveQuaternion, 0.02)) {
      camRotating = false
    }
  }
  if (camTargeting) {
    if (targetControls(controls, camMoveTarget, 0.02)) {
      camTargeting = false
      controls.enableRotate = true
    }
  }

  controls.update()

  if (model) {
    model.updateMixer(delta)

    if (safeDoorOpen) {
      model.getSafeDoor().rotation.y -= delta
    }
  }

  if (returnButton && returnButton.getReturnFlag()) {
    // Return to idle
    returnButton.setReturnFlag(false)

    //model.getHtml().goToPage("desktop")
    model.getHtml().cssObject.visible = false
    model.playAnimationByName("idle")
    stage = "idle"

    camMoving = true
    camTargeting = true
    camMovePos.set(1.5, 2, -1.5)
    camMoveTarget.set(0, 1, 0)
    
    controls.enableRotate = false
    controls.minPolarAngle = Math.PI * 1 / 4
    controls.maxPolarAngle = Math.PI * 2.2 / 4
  }

  renderer.render(scene, camera)
  css3DRenderer.render(scene, camera)
}

animate()
