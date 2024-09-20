import React, { useContext, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const LoginPopUp = ({setShowLogin}) => {

  const {URL,token,setToken} = useContext(ShopContext);
  const [state, setState] = useState("login");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
  })

  //  console.log(state);
  //  console.log(data);

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({...data,[name]:value}))
  }

  // console.log(URL);

  const Onlogin = async(e) =>{
    e.preventDefault();
    let newURL = URL;
    if(state === 'login'){
      newURL+='/api/user/login';
    }else{
      newURL+='/api/user/register';
    }

    const response = await axios.post(newURL,data);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }
  }

  // console.log(data);

  return (
    <div className="absolute h-full w-full bg-black/40 z-50 flexCenter">
      <form onSubmit={Onlogin} className="bg-white w-[366px] p-7 rounded-xl shadow-md">
        <div className="flex justify-between items-baseline">
          <h4 className="bold-2">{state}</h4>
          <FaXmark onClick={() => setShowLogin(false) } className="medium-20 text-slate-900/70 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4 my-6">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              required
              className="bg-primary border p-2 pl-4 rounded-md outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
            className="bg-primary border p-2 pl-4 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            required
            className="bg-primary border p-2 pl-4 rounded-md outline-none"
          />
          <button type="submit" className="btn-secondary rounded-md w-full">{state === "Sign Up" ? "Create Account" : "Login"}</button>
          <div className="flex items-baseline gap-x-3 mt-6 mb-4">
            <input type="checkbox" required />
            <p>By continuing you agree to our Terms of Service and Privacy Policy</p>
          </div>
          {state === "Sign Up" ? (
            <p>Already have an account <span onClick={() => setState("Login")} className="text-secondary cursor-pointer">Login</span></p>
          ) : (
            <p>Don't have an account? <span  onClick={() => setState("Sign Up")} className="text-secondary cursor-pointer">Sign Up</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
