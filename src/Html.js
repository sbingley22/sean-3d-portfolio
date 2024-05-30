import { CSS3DObject } from "three/examples/jsm/Addons.js"

export default function Html(object) {
  const container = document.createElement('div')
  container.style.width = '760px'
  container.style.height = '480px'
  container.style.background = 'rgba(211, 211, 200, 1)'
  //container.style.pointerEvents = 'none'
  //container.style.userSelect = 'none'

  const mainDiv = document.createElement('div')

  const taskBar = document.createElement('div')
  taskBar.style.backgroundColor = "#9988DD"
  taskBar.style.borderBottom = "4px solid black"

  const desktopButton = document.createElement('button')
  desktopButton.style.padding = "0 10px"
  desktopButton.style.margin = "0 10px"
  desktopButton.textContent = "Desktop"
  desktopButton.onclick = () => goToPage("desktop")

  const profileButton = document.createElement('button')
  profileButton.style.padding = "0 10px"
  profileButton.style.margin = "0 10px"
  profileButton.textContent = "Profile"
  profileButton.onclick = () => goToPage("profile")

  const emailButton = document.createElement('button')
  emailButton.style.padding = "0 10px"
  emailButton.style.margin = "0 10px"
  emailButton.textContent = "Email"
  emailButton.onclick = () => goToPage("email")

  const contactButton = document.createElement('button')
  contactButton.style.padding = "0 10px"
  contactButton.style.margin = "0 10px"
  contactButton.textContent = "Contact"
  contactButton.onclick = () => goToPage("contact")

  taskBar.appendChild(desktopButton)
  taskBar.appendChild(profileButton)
  taskBar.appendChild(emailButton)
  taskBar.appendChild(contactButton)
  container.appendChild(taskBar)
  container.appendChild(mainDiv)

  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }

  function goToPage(page) {
    removeAllChildren(mainDiv)

    if (page == "desktop") desktopPage(mainDiv)
    else if (page == "profile") profilePage(mainDiv)
  }

  const profilePage = (element) => {
    const profile = document.createElement('div')
    profile.style.margin = "1% 15%"
    profile.style.textAlign = "center"
    profile.style.color = "black"
    profile.style.overflow = "auto"
    profile.style.height = "50vh"
    profile.style.padding = "0 5%"
    profile.style.borderLeft = "2px solid black"

    const h1 = document.createElement('h1')
    h1.textContent = "Sean Bingley"
    profile.appendChild(h1)

    const img = document.createElement('img')
    img.src = "./profile.jpg"
    img.style.width = "100px"
    img.style.float = "left"
    img.style.borderRadius = "40%"
    img.style.border = "2px black solid"
    profile.appendChild(img)

    const text = [
      "Hi, I'm Sean Bingley.",
      "I have studies computer science at Sheffield Hallam University where I completed BSc degree in games software development.",
      "Since then I have completed the Odin Project and started working on web development projects of my own.",
      "I am currently focusing in using threejs and react three fiber to make interesting 3D interactable websites",
      "If you would like something similar contact me on upwork or using the contact form."
    ]  
    text.forEach( t => {
      const p = document.createElement("p")
      p.style.padding = "5px"
      p.textContent = t
  
      profile.appendChild(p)
    })

    const link = document.createElement('a')
    link.style.marginBottom = "0px"
    link.style.paddingBottom = "40px"
    link.href = "https://www.upwork.com/freelancers/~0191f4d25049fefef4?referrer_url_path=%2Fnx%2Fsearch%2Ftalent%2Fdetails%2F~0191f4d25049fefef4%2Fprofile"
    link.textContent = "My Upwork Profile"
    link.target = "_blank"
    profile.appendChild(link)

    element.appendChild(profile)
  }

  const desktopPage = (element) => {
    const desktop = document.createElement('div')
    desktop.style.margin = "10% 25%"
    desktop.style.textAlign = "left"
    desktop.style.display = "grid"
    desktop.style.gridTemplateColumns = "1fr 1fr"

    const shortcuts = ["profile", "email", "contact"]

    shortcuts.forEach(shortcut => {
      const shortcutContainer = document.createElement('div')
      shortcutContainer.style.textAlign = "center"
      shortcutContainer.style.color = "black"

      const shortcutButton = document.createElement
      ('button')
      shortcutButton.onclick = () => goToPage(shortcut)

      const shortcutIcon = document.createElement('img')
      shortcutIcon.src = `./${shortcut}.jpg`
      shortcutIcon.style.width = "32px"
      shortcutIcon.style.height = "32px"

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