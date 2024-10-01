import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Verify = () => {

  const [seachParams, setSearchParams] = useSearchParams();
  const success = seachParams.get("success");
  const orderId = seachParams.get("orderId");
  const {URL} = useContext(ShopContext);
  const navigate = useNavigate();

  const verifyPayement = async() => {
    const response = await axios.post(URL+"/api/order/verify",{success,orderId});
    if(response.data.success){
      navigate("/myorder")
    }else{
      navigate("/");
    }
  }

  useEffect(() => {
    verifyPayement();
  },[])

  // console.log(success,orderId)
  return (
    <div>
      <div className='min-h-[60vh] grid'>
        <div className='h-24 w-24 place-self-center border-4 border-t-secondary rounded-full animate-spin'>
        </div>
      </div>
    </div>
  )
}

export default Verify
