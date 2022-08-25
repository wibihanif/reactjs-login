import { useState } from "react"

const Text = () => {
  const [inputText, setInputText] = useState("")

  const showTweet = () => {
    alert(inputText)
  }

  return (
    <div>
      <h1>Text Page</h1>

      <input type="range" min={0} max={140} value={inputText.length} />

      <textarea
        style={{
          color: inputText.length >= 140 ? "red" : "black",
        }}
        value={inputText}
        onChange={(event) => {
          if (inputText.length >= 140) {
            setInputText(event.target.value.slice(0, 140))
            alert("Max characters reached")
          } else {
            setInputText(event.target.value)
          }
        }}
      />
      <br />
      <span
        style={{
          color: inputText.length >= 140 ? "red" : "black",
        }}
      >
        {inputText.length} / 140
      </span>
      <br />
      <button disabled={inputText.length >= 140} onClick={showTweet}>
        Tweet
      </button>
    </div>
  )
}

export default Text

