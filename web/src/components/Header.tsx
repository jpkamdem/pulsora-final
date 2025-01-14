import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import menu from "../assets/menu.png";
import pulsoraLogo from "../assets/pulsora-logo.png";
import pulsoraOne from "../assets/pulsora-1.png";
import userIcon from "../assets/user.png";
import NavLinks from "./NavLinks";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200 lg:hidden">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div>
            <img src={pulsoraLogo} alt="Logo Pulsora" className="w-10 h-11" />
          </div>

          <button onClick={toggleMenu}>
            <img src={menu} alt="Menu" className="w-8 h-7" />
          </button>
        </div>
      </header>

      <header className="hidden lg:flex bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto">
          <ul className="flex items-center justify-between ">
            <li>
              <img src={pulsoraOne} alt="Logo Pulsora" className="w-10 h-11" />
            </li>
            <NavLinks label="accueil" path="home" />
            <NavLinks label="articles" />
            <NavLinks label="nutrition" />
            <NavLinks label="saison" />
            <NavLinks label="equipe" />
            <NavLinks label="contact" />
            <li>
              <Link
                to="/profil"
                className="text-couleurprincipale font-bold text-lg tracking-wide px-4 py-2 rounded"
              >
                <img src={userIcon} alt="Logo User" className="w-8 h8" />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-[6.5rem] w-64 bg-white border-l border-gray-200 shadow-lg z-50"
        >
          <div className="flex flex-col justify-between h-[calc(100vh-6rem)]">
            <ul className="py-6 px-4 text-right space-y-2">
              <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <Link to="/">ACCUEIL</Link>
              </li>
              <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <Link to="/articles">ARTICLES</Link>
              </li>
              <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <Link to="/saison">SAISON</Link>
              </li>
              <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <Link to="/equipe">EQUIPE</Link>
              </li>
              <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>

            <div className="border-t border-gray-200 py-4 px-4">
              <ul className="space-y-2 text-right">
                <li className="text-couleurprincipale font-bold text-xl tracking-wide hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                  <Link to="/compte">COMPTE</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
