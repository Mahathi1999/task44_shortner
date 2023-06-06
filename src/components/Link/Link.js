import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

import api from "../../api/api";

import "./Link.css";
import { useHistory } from "react-router-dom";

function Link() {
  const history = useHistory();
  const [url, setUrl] = useState([]);
  const [login, setLogin] = useState();

  useEffect(() => {
    async function loadLinks() {
      const auth = localStorage.getItem("auth");
      try {
        const response = await api.get(`/user/${auth}`);

        setUrl(response.data);
        setLogin(response.data[0].userLogin);
      } catch (err) {
        alert("Erro ao carregar informações");
        history.push("/");
      }
    }
    loadLinks();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <h1>Olá, {login}!</h1>
        <hr />
        <h2>{login}, aqui abaixo estão todos os seus links!</h2>
        <ol className="ul-align">
          {url.map((u) => (
            <li key={u.id}>
              <div className="container-url">
                <p>
                  <strong>URL original</strong>: {u.urlOriginal}
                </p>
                <p>
                  <strong>URL shortened</strong>: {u.urlGenerated}
                </p>
                <p>
                  <strong>Generation date</strong>: {u.date}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Link;
