import { Link, NavLink } from 'react-router'

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          💰 Money Tracker
        </Link>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/" end>
            Kayıtlar
          </NavLink>
          <NavLink className="nav-link" to="/ekle">
            Yeni Kayıt
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
