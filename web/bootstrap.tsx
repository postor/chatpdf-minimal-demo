import { createRoot } from "react-dom/client"
import { BrowserRouter, useRoutes } from "react-router-dom"
import getRoutes from "@shack-js/auto-routes-loader/dist/shack-get-routes"
import { Suspense } from "react"
import './assets/main.css'

let el = document.querySelector("#react-root")
let routes = getRoutes()
console.log(routes)

const App = () => {
  return useRoutes(routes)
}

createRoot(el).render(<BrowserRouter>
  <Suspense fallback={"loading..."}>
    <App />
  </Suspense>
</BrowserRouter>)
