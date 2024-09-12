import React,{createContext} from 'react';
import { all_products } from '../assets/data';


export const ShopContext = createContext(null)


const ShopContextProvider = (props) => {


    const contextValue = {all_products}


  return (
    <div>
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    </div>
  )
}

export default ShopContextProvider
