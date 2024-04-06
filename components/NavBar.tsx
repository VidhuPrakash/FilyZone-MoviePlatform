"use client";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [search, setSearch] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function to remove the event listener when this
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`navbar ${isScrolled && "bg-black-1"}`}>
      <Link href="/">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
      </Link>
      <div className="nav-links">
        <Link href="/home" className="nav-link">
          Home
        </Link>
        <Link href="/my-list" className="nav-link">
          My List
        </Link>
      </div>
      <div className="nav-right">
        <div className="search">
          <input
            type="text"
            placeholder="Search Movie..."
            className="input-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="icon" />
        </div>
        <img
          src="/assets/profile_icon.png"
          alt="profile"
          className="profile"
          onClick={() => setDropdown(!dropdown)}
        />
        {dropdown && (
          <div className="dropdown-menu">
            <Link href="/home">Home</Link>
            <Link href="/my-list">My List</Link>
            <a href="logout">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
