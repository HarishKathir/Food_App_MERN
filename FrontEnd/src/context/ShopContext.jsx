import React,{createContext,useState} from 'react';
import { all_products } from '../assets/data';


export const ShopContext = createContext(null)


const ShopContextProvider = (props) => {

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

  const contextValue = {all_products, cartItems, setCartItems , addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount}

  return (
    <div>
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    </div>
  )
}

export default ShopContextProvider
