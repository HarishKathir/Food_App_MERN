import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react';


export const ShopContext = createContext(null)


const ShopContextProvider = (props) => {

  const URL = "http://localhost:8080";
  const [token,setToken] = useState("");
  const [all_products,setall_products] = useState([]);

  const [cartItems,setCartItems] = useState({});

  const addToCart =(itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev,[itemId]:1}))
    }else{
      setCartItems((prev) => ({...prev,[itemId]: prev[itemId]+1}))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId] : prev[itemId]-1 }))
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for(const item in cartItems){
      totalItems += cartItems[item]
    }
    return totalItems
  }

  const getTotalCartAmount = () => {
    let TotalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = all_products.find((product) => product._id === item)
        TotalAmount += itemInfo.price * cartItems[item];
      }
    }
    return TotalAmount;
  }

  const fetchProductList = async() =>{
    const response = await axios.get(URL+"/api/product/list");
    setall_products(response.data.data);
  }

  useEffect(() => {
    async function loadData(){
      await fetchProductList();
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
      }
    }   
    loadData(); 
  }, [])
  

  const contextValue = {all_products, cartItems, setCartItems , addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount,URL,token,setToken}

  return (
    <div>
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    </div>
  )
}

export default ShopContextProvider
