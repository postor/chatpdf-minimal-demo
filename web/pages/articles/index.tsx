import { useState } from "react"
import { exec } from "../../../apis/run"
import md5 from 'md5'
import { load, push } from "../../../apis/db"
import { useNavigate } from "react-router-dom"

export default function Index() {
  let [text, setText] = useState('')
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()
  return <div>
    <h2>Fill Article and Process</h2>
    <textarea
      placeholder="paste your article here,and make sure each paragraph token number less than 8191"
      value={text}
      onChange={e => setText(e.target.value)} />
    <br></br>
    {loading
      ? <p>loading....</p>
      : null}
    <button onClick={async () => {
      if (text)
        setLoading(true)
      let id = md5(text)
      await push(`/article/${id}`, { id, text })
      await exec('python3', ['py/process-article.py', 'compile', `embeddings/${id}`, text], { env: { OPENAI_API_KEY: await load('/token') } })
      nav(`/articles/${id}`)
    }}>Prepare It for Chat</button>
  </div>
}