import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <nav className="navMenu">
      <Link to="/home">Home</Link>
      <Link to="/create">Create Game</Link>
      <div className="search-box">
        <form onChange={handleChange}>
          <input
            placeholder="Busqueda"
            type="search"
          />
          <button
            type="submit"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </form>
      </div>
      <div className="dot"></div>
    </nav>
  );
}

export default Navbar;