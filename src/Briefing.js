export default function Briefing(element, bgm) {
  const div = document.createElement("div")
  div.className = "briefing-box"
  div.addEventListener("click", () => {
    div.style.display = "none"
    bgm.play()
  })

  const text = [
    "Your mission, should you choose to accept, is to obtain the profile of the worlds best programmer, Sean Bingley.",
    "Click to accept this mission."
  ]

  text.forEach( t => {
    const p = document.createElement("p")
    p.className = "briefing-text"
    p.textContent = t

    div.appendChild(p)
  })

  element.appendChild(div)

  return 
}