import { NavLink } from "react-router-dom"

const links = [{ children: 'Home', to: '/' }, { children: 'About', to: '/about' }, { children: 'Posts', to: '/posts' }]

export default function Nav() {
  return <nav>
    {links.map(x => <NavLink key={x.to} {...x} />)}
  </nav>
}