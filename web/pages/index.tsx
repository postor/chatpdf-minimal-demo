import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { load, push } from "../../apis/db"

export default function Index() {
  let [list, setList] = useState([])
  let [token, setToken] = useState('')
  let [tokenInput, setTokenInput] = useState('')
  useEffect(() => {
    load('/articles').then(x => setList(x))
    load('/token').then(x=>{
      setToken(x)
      setTokenInput(x)
    })
  }, [])
  return <div>
    <div>
      <input value={tokenInput} onChange={e => setTokenInput(e.target.value)} />
      <button onClick={()=>{
        setToken(tokenInput)
        push('/token',tokenInput)
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