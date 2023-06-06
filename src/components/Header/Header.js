import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  function getCookie() {
    const auth = localStorage.getItem("auth");
    return auth;
  }

  return (
    <>
      <header id="header">
        <nav>
          <div>
            <Link id="shorten" to="/">
              Shorten URL
            </Link>
          </div>
          <div>
            <Link id="register" to="/register">
              Register
            </Link>
          </div>
          <div>
            <Link id="login" to="/login">
              Login
            </Link>
          </div>
          <div>
            <Link id="links" to={"/user/" + getCookie()}>
              My links
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
