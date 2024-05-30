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

const model = LoadModel(scene)

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
Briefing(app, bgm)

const muted = Mute(app)
const returnButton = Return(app)

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
        }, [7000])
        infoBox.newText("His file should be on that computer.")
        model.playAnimationByName("drop")
        stage = "idle"

        camMoving = true
        camTargeting = true
        camMovePos.set(1.5, 2, 1.5)
        camMoveTarget.set(0, 1, 0)
        //camMoveQuaternion.setFromEuler(camMoveEuler.set(0,0,0))

        //console.log(controls)
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
          model.getHtml().visible = true
          infoBox.newText("Click and drag outside the monitor to look around.")
        }, 2000)

        returnButton.showReturn()

        camMoving = true
        camTargeting = true
        camMovePos.set(0, 1.3, 0)
        camMoveTarget.set(0, 1.3, 0.5)
        controls.enableRotate = false
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
  }

  if (returnButton && returnButton.getReturnFlag()) {
    // Return to idle
    returnButton.setReturnFlag(false)

    model.getHtml().visible = false
    model.playAnimationByName("idle")
    stage = "idle"

    camMoving = true
    camTargeting = true
    camMovePos.set(1.5, 2, 1.5)
    camMoveTarget.set(0, 1, 0)
    
    controls.enableRotate = false
    controls.minPolarAngle = Math.PI * 1 / 4
    controls.maxPolarAngle = Math.PI * 2.2 / 4
  }

  renderer.render(scene, camera)
  css3DRenderer.render(scene, camera)
}

animate()
