// src/components/layouts/Header.jsx
import { NavLink } from 'react-router-dom';
import logo from '../../assets/react.svg';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Site Logo" />
        </NavLink>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/editor" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Editor
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}