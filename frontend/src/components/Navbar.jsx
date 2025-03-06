import ThemeToggle from "./ThemeToggle";
import { Link, replace, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import {useAuth} from "../context/AuthContext"
import Cookies from "js-cookie";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/", {replace: true});
  }
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-4 bg-background border-b border-border shadow-md z-10">
      <Link to="/" className="text-text text-2xl font-bold hover:text-primary/90 transition-colors">
          <span className="font-extrabold text-3xl">X</span>
          <span className="font-medium tracking-tight">PENSO</span>
      </Link>
      <div className="flex items-center gap-4">
        {
          !Cookies.get("xpenso-accessToken")
          ?
          <>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-all font-medium hover:border-primary/50"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-lg bg-primary text-background hover:bg-primary/90 transition-all font-medium border border-primary"
            >
              Sign Up
            </Link>
          </>
          :
          <button
            className="bg-destructive text-white px-4 py-2 rounded-lg hover:bg-destructive-hover transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        }
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;