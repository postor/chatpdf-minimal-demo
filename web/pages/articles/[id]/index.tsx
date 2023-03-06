import { useParams } from "react-router-dom"

export default function Post() {
  let { category, title } = useParams()
  return <article>
    <h2></h2>
    <p>from category: {category}</p>
    <p>
      some content
    </p>
  </article>
}