import { CSS3DObject } from "three/examples/jsm/Addons.js"

export default function Html(object) {
  const container = document.createElement('div')
  container.style.width = '760px'
  container.style.height = '400px'
  container.style.background = 'rgba(211, 211, 200, 1)'
  container.style.display = "grid"
  container.style.gridTemplateRows = "9fr 1fr"
  //container.style.pointerEvents = 'none'
  //container.style.userSelect = 'none'

  const mainDiv = document.createElement('div')

  const taskBar = document.createElement('div')

  const desktopButton = document.createElement('button')
  const profileButton = document.createElement('button')

  taskBar.appendChild(desktopButton)
  taskBar.appendChild(profileButton)
  container.appendChild(mainDiv)
  container.appendChild(taskBar)

  const cssObject = new CSS3DObject(container)
  cssObject.position.set(0, 0, 0)
  cssObject.rotation.x = -Math.PI/1
  const scale = 0.001
  cssObject.scale.set(scale,scale,scale)

  object.add(cssObject)

  return cssObject
}