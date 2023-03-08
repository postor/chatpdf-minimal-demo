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
    <p>粘贴文章到文本框，要求每个段落字数尽量少于 2000，总段落数尽量小于 5，没做优化避免超时出错等</p>
    <p>paste article into text field, try keep each paragraph contain less than 2000 tokens and count of paragraph less than 5</p>
    <textarea
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
      await push(`/articles[]`, id)
      await exec(
        'python3',
        ['py/process-article.py', 'compile', `embeddings/${id}`, text],
        { env: { OPENAI_API_KEY: localStorage.getItem('token') } })
      nav(`/articles/${id}`)
    }}>编译并聊天 | Prepare It for Chat</button>
  </div>
}