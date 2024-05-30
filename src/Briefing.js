export default function Briefing(element, bgm) {
  const div = document.createElement("div")
  div.className = "briefing-box"
  div.addEventListener("click", () => {
    div.style.display = "none"
    bgm.play()
  })

  const text = [
    "Your mission, should you choose to accept, is to obtain the profile of the worlds best programmer, Sean Bingley.",
    "The profile is on a computer in a maximum security room.",
    "Good luck Agent!",
    "",
    "Click to accept this mission."
  ]

  text.forEach( (t, index) => {
    const p = document.createElement("p")
    p.className = "briefing-text"
    p.textContent = t

    if (index == 0) p.style.borderTop = "1px rgb(1, 255, 1) solid"
    else if (index == text.length -1) {
      //p.style.borderTop = "1px rgb(1, 255, 1) solid"
      p.style.borderBottom = "1px rgb(1, 255, 1) solid"
    }

    div.appendChild(p)
  })

  element.appendChild(div)

  return 
}