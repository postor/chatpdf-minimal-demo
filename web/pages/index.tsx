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
      <button onClick={()=>{
        setToken(tokenInput)
        localStorage.setItem('token',tokenInput)
      }}>Update Token</button>
    </div>
    <hr />
    {token
      ? <div>
        <h2>Choose Article or Create New</h2>
        <ul>
          {list.map(x => <li key={x}>
            <Link to={`/posts`}>{x}</Link>
          </li>)}
        </ul>
        <Link to={'/articles'}>Create New</Link>
      </div>

      : null
    }
  </div>
}