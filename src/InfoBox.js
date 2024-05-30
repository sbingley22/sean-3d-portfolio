export default function InfoBox(element) {
  const div = document.createElement("div")
  div.className = "info-box"
  div.addEventListener("click", () => {
    div.style.display = "none"
  })

  const p = document.createElement("p")
  p.className = "info-text"
  p.textContent = "Click the agent to proceed."

  div.appendChild(p)
  element.appendChild(div)

  const newText = (text) => {
    p.textContent = text
    div.style.display = "block"
  }

  return { newText }
}