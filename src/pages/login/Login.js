import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAuthenticantion } from "../../hooks/useAuthenticantion";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //renomeando o error que vai chegar do backend, junto com as outras funções do servidor
  const { login, error: authError, loading } = useAuthenticantion();

  const handleSubmit = async (e, token) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
      token,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>
        Faça o login para poder postar, ou{" "}
        <Link to="/register">Cadastre-se</Link>{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button
            className="btn g-recaptcha"
            data-sitekey="6LeMLQMhAAAAAHlPWljR1vioKlevpcRduLbtqwPg"
            data-callback="handleSubmit"
            data-action="submit"
            type="submit"
          >
            Entrar
          </button>
        )}
        {loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
