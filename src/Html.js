import { CSS3DObject } from "three/examples/jsm/Addons.js"
import { element } from "three/examples/jsm/nodes/Nodes.js"

export default function Html(object, infoBox) {
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
    else if (page == "email") emailPage(mainDiv)
    else if (page == "contact") contactPage(mainDiv)
  }

  const contactPage = (element) => {
    const contact = document.createElement('div')
    contact.style.margin = "1% 15%"
    contact.style.textAlign = "center"
    contact.style.color = "black"
    contact.style.overflow = "auto"
    contact.style.height = "50vh"
    contact.style.padding = "0 5%"
    contact.style.borderLeft = "2px solid black"
  
    const h1 = document.createElement('h1')
    h1.textContent = "Contact Me"
    contact.appendChild(h1)
  
    const form = document.createElement('form')
    form.style.display = "grid"
    form.style.gridTemplateColumns = "1fr"
    form.style.gap = "10px"
  
    const nameLabel = document.createElement('label')
    nameLabel.textContent = "Name:"
    form.appendChild(nameLabel)
  
    const nameInput = document.createElement('input')
    nameInput.type = "text"
    nameInput.style.padding = "10px"
    nameInput.style.width = "100%"
    nameInput.required = true
    form.appendChild(nameInput)
  
    const emailLabel = document.createElement('label')
    emailLabel.textContent = "Email:"
    form.appendChild(emailLabel)
  
    const emailInput = document.createElement('input')
    emailInput.type = "email"
    emailInput.style.padding = "10px"
    emailInput.style.width = "100%"
    emailInput.required = true
    form.appendChild(emailInput)
  
    const messageLabel = document.createElement('label')
    messageLabel.textContent = "Message:"
    form.appendChild(messageLabel)
  
    const messageInput = document.createElement('textarea')
    messageInput.style.padding = "10px"
    messageInput.style.width = "100%"
    messageInput.style.height = "100px"
    messageInput.required = true
    form.appendChild(messageInput)
  
    const submitButton = document.createElement('button')
    submitButton.type = "submit"
    submitButton.style.padding = "10px"
    submitButton.style.marginTop = "10px"
    submitButton.style.marginBottom = "20px"
    submitButton.textContent = "Submit"
    form.appendChild(submitButton)
  
    form.onsubmit = (event) => {
      event.preventDefault()
      const name = nameInput.value
      const email = emailInput.value
      const message = messageInput.value
  
      if (infoBox) {
        infoBox.newText(`Thank you for your message, ${name}! We'll get back to you at ${email}.`)
      }
  
      nameInput.value = ''
      emailInput.value = ''
      messageInput.value = ''
    }
  
    contact.appendChild(form)
    element.appendChild(contact)
  }

  const emailPage = (element) => {
    const email = document.createElement('div')
    email.style.margin = "1% 15%"
    email.style.textAlign = "center"
    email.style.color = "black"
    email.style.overflow = "auto"
    email.style.height = "50vh"
    email.style.padding = "0 5%"
    email.style.borderLeft = "2px solid black"

    const messages = [
      {
        to: "Sean Bingley",
        from: "Friendly Client",
        text: "Hey there Sean, How's that project coming along?"
      },
      {
        from: "Sean Bingley",
        to: "Friendly Client",
        text: "It's coming along great, should be ready by tomorrow."
      },
      {
        from: "Sean Bingley",
        to: "Mega Safe Tech Support",
        text: "My safe keeps reseting to this combination. What do I do?",
        img: "./safecombo.jpg"
      },
      {
        to: "Sean Bingley",
        from: "Mega Safe Tech Support",
        text: "We will send somebody over. Also don't send safe combinations over email."
      },
      {
        from: "Sean Bingley",
        to: "Mega Safe Tech Support",
        text: "Eh don't worry about it. It's not like somebodies going to break in here and view my emails. lol."
      },
    ]

    messages.forEach( (message) => {
      const msgContainer = document.createElement('div')
      msgContainer.style.border = "2px solid black"

      const h6 = document.createElement('h5')
      h6.textContent = `From: ${message.from}`
      h6.style.margin = "0px"
      msgContainer.appendChild(h6)

      const h6b = document.createElement('h5')
      h6b.textContent = `To: ${message.to}`
      h6b.style.margin = "0px"
      msgContainer.appendChild(h6b)

      const p = document.createElement("p")
      p.style.padding = "5px"
      p.textContent = message.text
      msgContainer.appendChild(p)

      if (message.img) {
        const img = document.createElement('img')
        img.src = "./profile.jpg"
        img.style.width = "160px"
        img.style.borderRadius = "0%"
        img.style.border = "2px black solid"
        msgContainer.appendChild(img)
      }

      email.appendChild(msgContainer)
    })

    element.appendChild(email)
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

    const button = document.createElement('button')
    button.style.display = "block"
    button.style.margin = "20px"
    button.style.width = "90%"
    button.onclick = () => { 
      if (infoBox) infoBox.newText("Great work. We have his upwork profile. Continue snooping around and see what else you can find.")
    }
    button.textContent = "DOWNLOAD"
    profile.appendChild(button)

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