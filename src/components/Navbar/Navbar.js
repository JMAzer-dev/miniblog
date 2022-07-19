import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";

import { useAuthenticantion } from "../../hooks/useAuthenticantion";
import { useAuthValue } from "../../context/AuthContext";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  //Usuário capturado do provider
  const { user } = useAuthValue();

  //logout
  const { logout } = useAuthenticantion();

  return (
    <div className={styles.cont}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand}>
          Mini <span>Blog</span>
        </Link>
        <ul className={styles.link_list}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink to="/posts/create">Novo Post</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>
          {user && (
            <>
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            </>
          )}
        </ul>
        {/* Mobile button */}
        <div
          onClick={handleNav}
          className={nav ? styles.close_menu : styles.open_menu}
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul onClick={handleNav} className={nav ? styles.link_list_menu : styles.link_list_close}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <Link to="/posts/create">Novo Post</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about">Sobre</Link>
          </li>
          {user && (
            <>
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
