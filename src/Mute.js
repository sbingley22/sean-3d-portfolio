export default function Mute(element) {
  let muted = false

  const div = document.createElement("div")
  div.className = "mute-button"

  const speaker = document.createElement("img")
  speaker.src = "./speaker.png"

  const mute = document.createElement("img")
  mute.src = "./mute.png"
  mute.style.display = "none"

  div.addEventListener("click", () => {
    muted = !muted

    const audioElements = document.querySelectorAll('audio')
    audioElements.forEach(audio => {
      if (!muted) {
        audio.play()
      } else {
        audio.pause()
      }
    })

    if (muted) {
      speaker.style.display = "none"
      mute.style.display = "block"
    } else {
      speaker.style.display = "block"
      mute.style.display = "none"
    }

  })

  div.appendChild(speaker)
  div.appendChild(mute)
  element.appendChild(div)

  const getMuted = () => {
    return muted
  }

  return { getMuted }
}