import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { load } from "../../../../apis/db"
import nl2br from 'react-nl2br'
import { exec } from "../../../../apis/run"

export default function Post() {
  let { id } = useParams()
  let [article, setArticle] = useState('')
  let [msgs, setMsgs] = useState([])
  let [question, setQuestion] = useState('')
  useEffect(() => {
    load(`/article/${id}/text`).then(x => setArticle(x))
  }, [id])
  return <article>
    <h2>Chat with {id}</h2>
    <div style={{
      display: 'flex',
    }}>
      <div style={{ flex: 1 }}>
        <article>
          {nl2br(article)}
        </article>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
        }}>
          <input value={question} onChange={e => setQuestion(e.target.value)} />
          <button onClick={async () => {
            setQuestion('')
            setMsgs(msgs => [`Q:${question}`, ...msgs])
            let { stdout } = await exec(
              'python3',
              ['py/process-article.py', 'ask', `embeddings/${id}`, question],
              { env: { OPENAI_API_KEY: localStorage.getItem('token') } })
            let { answer } = JSON.parse(stdout)
            setMsgs(msgs => [`A:${answer}`, ...msgs])
          }}>Send</button>
        </div>
        <ul>{msgs.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </div>
    </div>
  </article>
}