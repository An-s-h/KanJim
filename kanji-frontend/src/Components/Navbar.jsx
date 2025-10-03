import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Users, House, Menu, X } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    sessionStorage.setItem("redirectPath", location.pathname);
    navigate("/signin");
  };

  return (
    <nav className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-2xl bg-white/10 backdrop-blur-md shadow-md border border-white/20 px-6 py-3 flex justify-between items-center text-white z-10">
      
      {/* Logo */}
      <Link 
        to="/" 
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 potta-one-regular"
      >
        Kanzen <span className="text-xl"> 日本語</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        <Link
          to="/"
          className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <House className="w-4 h-4" />
          Home
        </Link>
        <Link
          to="/progress"
          className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <Trophy className="w-4 h-4" />
          Progress
        </Link>
        <Link
          to="/resources"
          className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <Users className="w-4 h-4" />
          Resources
        </Link>
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <SignedOut>
          <button
            onClick={handleSignIn}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
          >
            Sign In
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Hamburger */}
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className=" absolute z-50 top-full mt-2 right-4 w-56 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 border backdrop-blur-xl shadow-2xl border-white/20 p-4 flex flex-col gap-3 text-sm">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <House className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/progress"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <Trophy className="w-4 h-4" /> Progress
          </Link>
          <Link
            to="/resources"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <Users className="w-4 h-4" /> Resources
          </Link>

          <div className="border-t border-white/20 pt-3">
            <SignedOut>
              <button
                onClick={() => { handleSignIn(); setMenuOpen(false); }}
                className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
              >
                Sign In
              </button>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}
