import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../api/api";

import Header from "../Header/Header";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", {
        login: login,
        password: password,
      });
      if (response.status === 200) {
        const userId = response.data.id;
        localStorage.setItem("auth", userId);
        history.push("/");
      }
    } catch {
      alert("Login ou senha inválidos");
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <form className="form-login" onSubmit={handleLogin}>
          <div className="title-application">
            <h2>Login</h2>
          </div>
          <hr />
          <label>Login:</label>
          <br />
          <input
            type="text"
            placeholder="Enter your login"
            onChange={(evt) => {
              setLogin(evt.target.value);
            }}
          />
          <br />
          <label>Senha:</label> <br />
          <input
            placeholder="Enter your password"
            type="password"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <br />
          <div id="align-button">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
