import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { all_products, cartItems, getTotalCartAmount, URL, token } =
    useContext(ShopContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    all_products.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(URL+"/api/order/place",orderData,{headers:{token}});
    // console.log(response);
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      console.log("Error");
    }
    // console.log(orderItems);
    // console.log(orderData);
  };

  useEffect(()=>{
    if(!token){
      navigate("/cart");
    }else if(getTotalCartAmount() === 0 ){
      navigate("/cart");
    }
  },[token])
  return (
    <div className="max-padd-container py-28 xl:py-32 ">
      <form
        onSubmit={placeOrder}
        className="flex flex-col xl:flex-row gap-20 xl:gap-28 "
      >
        {/* Delivery Info */}
        <div className="flex flex-1 flex-col gap-3 text-[95%]">
          <h3 className="bold-28 mb-4">Delivery Information</h3>
          <div className="flex gap-3">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={onChangeHandler}
              value={data.firstname}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={onChangeHandler}
              value={data.lastname}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChangeHandler}
              value={data.email}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="test"
              name="phone"
              placeholder="Phone Number"
              onChange={onChangeHandler}
              value={data.phone}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              name="street"
              placeholder="Street"
              onChange={onChangeHandler}
              value={data.street}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={onChangeHandler}
              value={data.city}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={data.state}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              name="zipcode"
              placeholder="ZipCode"
              onChange={onChangeHandler}
              value={data.zipcode}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={onChangeHandler}
              value={data.country}
              required
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2"
            />
          </div>
        </div>
        {/* Cart Total */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-2">
            <h4 className="bold-22">Summary</h4>
            <div className="">
              <div className="flexBetween py-3">
                <h4 className="medium-16">Sub Total:</h4>
                <h4 className="text-gray-30 font-semibold">
                  {getTotalCartAmount()}
                </h4>
              </div>
              <hr className="h-[2px] bg-slate-900/15 border-none outline-none" />
              <div className="flexBetween py-3">
                <h4 className="medium-16">Shipping Fees:</h4>
                <h4 className="text-gray-30 font-semibold">
                  ${getTotalCartAmount() === 0 ? 0 : 2}
                </h4>
              </div>
              <hr className="h-[2px] bg-slate-900/15 border-none outline-none" />
              <div className="flexBetween py-3">
                <h4 className="bold-18">Total:</h4>
                <h4 className="bold-18">
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </h4>
              </div>
            </div>
            <button
              type="submit"
              onClick={() => navigate("/order")}
              className="btn-secondary w-52 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
