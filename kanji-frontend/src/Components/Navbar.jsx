import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Users, House } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = () => {
    sessionStorage.setItem("redirectPath", location.pathname);
    navigate("/signin");
  };


  return (
    <nav className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-2xl bg-white/10 backdrop-blur-md shadow-md border border-white/20 px-6 py-3 flex justify-between items-center text-white z-10">
      {/* Logo */}
 <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 potta-one-regular" >
        Kanzen <span className="text-xl"> 日本語</span>
      </Link>

      {/* Links */}
      <div className="flex gap-6">
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

      {/* Auth Buttons */}
          <div className="flex items-center gap-3">
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
    </nav>
  )
}
