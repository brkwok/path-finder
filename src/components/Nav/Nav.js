import "./Nav.css"

const Nav = (props) => {
  return(
    <nav className="nav-container">
      <div className="">
        <button>DFS</button>
        <button>BFS</button>
        <button>Djikstra</button>
      </div>
    </nav>
  )
}
export default Nav