import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/artBook.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=sketch">
            <h6>SKETCH</h6>
          </Link>
          <Link className="link" to="/?cat=stencil">
            <h6>STENCIL</h6>
          </Link>
          <Link className="link" to="/?cat=painting">
            <h6>PAINTING</h6>
          </Link>
          <Link className="link" to="/?cat=silhouette">
            <h6>SILHOUETTE</h6>
          </Link>
          <Link className="link" to="/?cat=mandala">
            <h6>MANDALA</h6>
          </Link>
          <Link className="link" to="/?cat=other">
            <h6>OTHER</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
