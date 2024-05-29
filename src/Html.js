import { CSS3DObject } from "three/examples/jsm/Addons.js"

export default function Html(object) {
  const container = document.createElement('div')
  container.style.width = '760px'
  container.style.height = '480px'
  container.style.background = 'rgba(211, 211, 200, 1)'
  //container.style.display = "grid !important"
  //container.style.gridTemplateRows = "9fr 1fr"
  //container.style.pointerEvents = 'none'
  //container.style.userSelect = 'none'

  const mainDiv = document.createElement('div')

  const taskBar = document.createElement('div')
  taskBar.style.backgroundColor = "#9988DD"

  const desktopButton = document.createElement('button')
  desktopButton.style.padding = "0 10px"
  desktopButton.style.margin = "0 10px"
  desktopButton.textContent = "Desktop"

  const profileButton = document.createElement('button')
  profileButton.style.padding = "0 10px"
  profileButton.style.margin = "0 10px"
  profileButton.textContent = "Profile"

  taskBar.appendChild(desktopButton)
  taskBar.appendChild(profileButton)
  container.appendChild(taskBar)
  container.appendChild(mainDiv)

  const desktopPage = (element) => {
    const desktop = document.createElement('div')
    desktop.style.margin = "10% 25%"
    desktop.style.textAlign = "left"

    const shortcuts = ["profile", "emails"]

    shortcuts.forEach(shortcut => {
      const shortcutContainer = document.createElement('div')
      const shortcutButton = document.createElement('button')
      const shortcutIcon = document.createElement('img')
      const shortcutText = document.createElement('p')

      shortcutText.textContent = shortcut

      shortcutButton.appendChild(shortcutIcon)
      shortcutContainer.appendChild(shortcutButton)
      shortcutContainer.appendChild(shortcutText)

      desktop.appendChild(shortcutContainer)
    })

    element.appendChild(desktop)
  }
  desktopPage(mainDiv)

  const cssObject = new CSS3DObject(container)
  cssObject.position.set(0, 0, 0)
  const scale = 0.001
  cssObject.scale.set(-scale,scale,scale)
  //cssObject.rotation.x = Math.PI
  //cssObject.rotation.y = -Math.PI
  //cssObject.rotation.z = Math.PI

  object.add(cssObject)

  return cssObject
}