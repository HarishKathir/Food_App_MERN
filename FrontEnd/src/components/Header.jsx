import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import { MdMenu, MdClose } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { LuUser2 } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";

const Header = ({setShowLogin}) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [token, setToken] = useState(false);
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 35 ? setHeader(true) : setHeader(false);
    }

    const checkurl = () => {
      const currentURL = window.location.href;
      if(currentURL !== "http://localhost:5173/"){
        setHeader(true)
      }else{
        window.addEventListener("scroll", handleScroll)
      }
    }
    checkurl();

    return () =>{
      window.removeEventListener("scroll",handleScroll);
    }
  },[location])

  return (
    <header className={`${header ? "bg-white shadow-sm py-4" : "bg-transparent py-5"} fixed left=0 right-0 w-full z-10 transition-all duration-300`}>
      <div className="max-padd-container flexBetween">
        {/* logo */}
        <Link to={"/"} className="bold-24">
          <h4>
            Food <span className="text-secondary">Stack</span>
          </h4>
        </Link>
        {/* navbar */}
        <div className="flexBetween gap-x-20">
          {/* combined navbar */}
          <Navbar
            header={header}
            menuOpened={menuOpened}
            containerStyles={`${
              menuOpened 
              ? "flex md:hidden items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-xl w-64 medium-16 ring-2 ring-slate-900/5 transition-all duration-300" 
              : "hidden md:flex gap-x-5 xl:gap-x-10 medium-15"
            }`}
          />
          <div className="flexBetween gap-x-2 xs:gap-x-8">
            {/* buttons */}
            {!menuOpened ? (
              <MdMenu onClick={(toggleMenu)} className="md:hidden cursor-pointer text-2xl" />
            ) : (
              <MdClose onClick={(toggleMenu)} className="md:hidden cursor-pointer text-2xl" />
            )}
            <Link to={'/cart'} className="flex relative">
              <GiShoppingBag className="text-[25px]" />
              <span className="bg-white text-tertiary text-sm absolute -right-2.5 -top-2.5 flexCenter w-5 h-5 rounded-full shadow-md">0</span>
            </Link>
            {!token ? (
              <button onClick={() => setShowLogin(true)} className="btn-light rounded-full flexCenter gap-x-2">
                <LuUser2 className="bold-18" />
                Login
              </button>
            ) : (
              <div className="group -relative">
                <FaCircleUser className="text-2xl" />
                <ul className="bg-primary shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded absolute right-0 hidden group-hover:flex flex-col">
                  <li onClick={() => Navigate("/myorders")} className="flexCenter gap-x-2 cursor-pointer">
                    <FiPackage className="text-[19px]" />
                    <p>orders</p>
                  </li>
                  <hr className="my-2"/>
                  <li onClick={() => Navigate("/myorders")} className="flexCenter gap-x-2 cursor-pointer">
                    <TbLogout className="text-[19px]" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
