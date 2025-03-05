import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Exam Portal</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/exam">Exam</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/result">Results</Link>
      </div>
    </nav>
  );
};

export default Navbar;
