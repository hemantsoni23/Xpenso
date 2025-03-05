import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useLocation, Link } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-background text-text flex flex-col md:flex-row">
      {/* Left Side Logo + Tagline */}
      <div className="bg-primary flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left px-10 h-full p-3 min-h-6/12 md:min-h-screen">
        <Link to="/" className="text-text text-4xl font-bold hover:text-text/50 transition-colors">
          <span className="font-extrabold text-5xl">X</span>
          <span className="font-medium tracking-tight">PENSO</span>
        </Link>
        <p className="text-lg font-medium text-text">
          Track your daily expenses easily!
        </p>
      </div>

      {/* Right Side Login/Signup Card */}
      <div className="flex-1 flex justify-center items-center h-full min-h-screen">
        <div className="w-96">
          {isSignup ? <SignUp /> : <Login />}
          <div className="text-center mt-4">
            {isSignup ? (
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/" className="text-primary underline">
                  Login here
                </Link>
              </p>
            ) : (
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary underline">
                  Sign Up
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
