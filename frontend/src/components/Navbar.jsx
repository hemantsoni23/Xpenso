import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-4 bg-background border-b border-border shadow-md z-10">
      <Link to="/" className="text-primary text-xl font-bold">
        XPENSO
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-muted hover:text-primary transition-all">Login</Link>
        <Link to="/signup" className="text-muted hover:text-primary transition-all">Sign Up</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
