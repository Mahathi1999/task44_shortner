import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../api/api";
import bitly from "../../api/bitly";

import Header from "../Header/Header";
import "./Shortener.css";

function Shortener() {
  const history = useHistory();
  const [url, setUrl] = useState();
  const [urlShort, setUrlShort] = useState();

  async function handleSumbmit(event) {
    event.preventDefault();

    const auth = localStorage.getItem("auth");

    if (auth == null) {
      alert("Please register to use the shortener");
      history.push("/register");
    } else {
      try {
        const responseBitly = await bitly(url);

        //verifica se a URL é válida
        if (responseBitly.status_code !== 200) {
          alert("Por favor, insira uma URL válida");
          return;
        }

        const responseUser = await api.get(`/user/get/${auth}`);

        const responseUrl = await api.post("/", {
          userId: auth,
          userLogin: responseUser.data.login,
          urlOriginal: url,
          urlGenerated: responseBitly.data.url,
          date: Date.now(),
        });
        if (responseUrl.status === 200) {
          setUrlShort(responseUrl.data.urlGenerated);
        }
      } catch (err) {
        localStorage.removeItem("auth");
        alert("Please register to use the shortener");
        history.push("/register");
      }
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <form className="form-url" onSubmit={handleSumbmit}>
          <div className="title-application">
            <h2>URL Shortened</h2>
          </div>
          <hr />
          <label>URL original:</label>
          <br />
          <input
            type="text"
            placeholder="Inform the original link"
            onChange={(evt) => setUrl(evt.target.value)}
          />
          <br />
          <label>URL shortened:</label> <br />
          <input
            value={urlShort}
            placeholder="Shortened URL here"
            type="text"
            disabled
          />
          <br />
          <div id="align-button">
            <button type="submit">Shorten</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Shortener;
