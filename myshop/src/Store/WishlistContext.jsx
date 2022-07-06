import React, {createContext, useReducer} from "react"; 
import {WishlistReducer} from "./WishlistReducer";


export const WishlistContext = createContext()
const WishlistContextProvider= (props)=>{
    const [wishlist, wishdispatch]= useReducer(WishlistReducer,{wishlist:[]})
    return (
        <WishlistContext.Provider value={{...wishlist,wishdispatch}}>
            {props.children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider


