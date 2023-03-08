import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { load, push } from "../../apis/db"

export default function Index() {
  let [list, setList] = useState([])
  let [token, setToken] = useState(localStorage.getItem('token'))
  let [tokenInput, setTokenInput] = useState(localStorage.getItem('token'))
  useEffect(() => {
    load('/articles').then(x => setList(x))
  }, [])
  return <div>
    <div>
      <input value={tokenInput} onChange={e => setTokenInput(e.target.value)} />
      <button onClick={() => {
        setToken(tokenInput)
        localStorage.setItem('token', tokenInput)
      }}>更新 API key | Update API key</button>
    </div>
    <hr />
    {token
      ? <div>
        <ul>
          {list.map(x => <li key={x}>
            <Link to={`/articles/${x}`}>{x}</Link>
          </li>)}
        </ul>
        <Link to={'/articles'}>新建 | Create New</Link>
      </div>

      : null
    }
  </div>
}