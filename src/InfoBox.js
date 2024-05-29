export default function InfoBox(element) {
  const div = document.createElement("div")
  div.className = "info-box"
  div.addEventListener("click", () => {
    console.log(div.style)
    div.style.display = "none"
  })

  const p = document.createElement("p")
  p.className = "info-text"
  p.textContent = "Your mission, should you choose to accept, is to obtain the profile of the worlds best programmer, Sean Bingley. Click the agent to proceed."

  div.appendChild(p)
  element.appendChild(div)

  const newText = (text) => {
    p.textContent = text
    div.style.display = "block"
  }

  return { newText }
}