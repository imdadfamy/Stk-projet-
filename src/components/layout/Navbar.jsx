import { NavLink, useNavigate } from "react-router-dom";
import { useGameContext, getRank } from "../../context/GameContext";
import { RANKS } from "../../data/pairs";
import "./Navbar.css";

export default function Navbar() {
  const { totalXP, rank } = useGameContext();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <span className="logo-stk">STK</span>
          <span className="logo-sub">ARCHITECTURE</span>
        </NavLink>

        {/* Links */}
        <ul className="navbar-links">
          <li><NavLink to="/"      className={({isActive})=>isActive?"nav-link active":"nav-link"}>Accueil</NavLink></li>
        
          <li><NavLink to="/engagement"  className={({isActive})=>isActive?"nav-link active":"nav-link"}>Notice du Jeu </NavLink></li>

        </ul>

        {/* Rank badge */}
        <div className="navbar-rank" style={{ color: rank.color }}>
          <span className="rank-emoji">{rank.emoji}</span>
          <span className="rank-label">{rank.label}</span>
          <span className="rank-xp">{totalXP} XP</span>
        </div>
      </div>
    </nav>
  );
}
