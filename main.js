import './style.css'
import * as THREE from 'three'
import { Controls, Lighting, LoadModel, setupThreeScene } from './src/Scene'

const app = document.querySelector('#app')

const { scene, camera, renderer, css3DRenderer } = setupThreeScene(app)

const controls = Controls(camera, renderer)

Lighting(scene)

const model = LoadModel(scene)

const clock = new THREE.Clock(true)

camera.position.set(0,2,6)

// Render loop
function animate() {
  requestAnimationFrame(animate)

  var delta = clock.getDelta()

  controls.update()

  if (model) {
    model.updateMixer(delta)
  }

  renderer.render(scene, camera)
  css3DRenderer.render(scene, camera);
}

animate()
