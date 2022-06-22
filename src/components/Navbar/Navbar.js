import styles from './Navbar.module.css'
import { NavLink, Link } from 'react-router-dom'

import { useAuthenticantion } from '../../hooks/useAuthenticantion'
import { useAuthValue } from '../../context/AuthContext'

const Navbar = () => {

  //Usuário capturado do provider
  const { user } = useAuthValue()

  //logout
  const { logout } = useAuthenticantion();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </Link>
      <ul className={styles.link_list}>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login">
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                Cadastrar
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink to="/posts/create">
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">
            Sobre
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <button onClick={logout}>
                Sair
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar