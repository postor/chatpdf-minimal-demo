import { useState } from "react"

export default function Index() {
  let [text, setText] = useState('')
  let [loading, setLoading] = useState(false)
  return <div>
    <h2>Fill Article and Process</h2>
    <textarea
    placeholder="make sure each paragraph token number less than 8191"
      value={text}
      onChange={e => setText(e.target.value)} />
    <br></br>
    {loading
      ? <p>loading....</p>
      : null}
    <button onClick={() => {
      if (text)
        setLoading(true)
    }}>Prepare It for Chat</button>
  </div>
}