export default function Return(element) {
  let returnFlag = false

  const div = document.createElement("div")
  div.className = "return"
  div.style.display = "none"

  div.addEventListener("click", () => {
    div.style.display = "none"
    returnFlag = true
  })

  const p = document.createElement("p")
  p.className = "info-text"
  p.textContent = "<"

  div.appendChild(p)
  element.appendChild(div)

  const setReturnFlag = (flag) => {
    returnFlag = flag
  }

  const getReturnFlag = () => {
    return returnFlag
  }

  const showReturn = () => {
    div.style.display = "block"
  }

  return { setReturnFlag, getReturnFlag, showReturn }
}