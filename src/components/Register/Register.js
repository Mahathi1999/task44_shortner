import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../api/api";

import Header from "../Header/Header";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPass) {
      alert("Erro na confirmação de senha");
      return;
    }

    const user = {
      login: login,
      password: password,
    };

    try {
      const response = await api.post("/register", user);
      if (response.status === 200) {
        localStorage.setItem("auth", response.data.id);
        history.push("/");
      }
    } catch (err) {
      alert("O login já existe. Por favor, tente outro.");
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="title-application">
            <h2>Register</h2>
          </div>
          <hr />
          <label>Login:</label>
          <br />
          <input
            name="login"
            type="text"
            placeholder="Login or register"
            onChange={(evt) => setLogin(evt.target.value)}
          />
          <br />
          <label>Senha:</label> <br />
          <input
            name="password"
            placeholder="Enter a password to register"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <label>Confirme sua senha:</label> <br />
          <input
            name="confirmpass"
            placeholder="Re-enter your password"
            type="password"
            onChange={(evt) => setConfirmPass(evt.target.value)}
          />
          <br />
          <div id="align-button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
