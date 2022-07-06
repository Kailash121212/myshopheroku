export const WishlistReducer =(state,action)=>{
    const {wishlist}=state
    switch(action.type){
        case "ADD_TO_WISHLIST":
            const check= wishlist.find((item)=>item.id==action.id)
            if(check)
                    return state
            else{
                 return {
                    wishlist:[action.product,...wishlist],
                    
                }
            }
            break;
        case "DELETE":
            const filteredProducts =wishlist.filter((item)=>item.id!=action.id)
            return{
                wishlist:[...filteredProducts],    
            }
        default:
            return state;
    }
}