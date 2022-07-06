export const CartReducer =(state,action)=>{
    const {shoppingCart, totalPrice,qty}=state
let product,updatedPrice,updateQTY,index
    switch(action.type){
        case "ADD_TO_CART":
            const check= shoppingCart.find((item)=>item.id==action.id)
            if(check)
                    return state
            else{
                product= action.product
                product['qty']=1
                updateQTY= qty+1
                updatedPrice= totalPrice+product.finalprice
                return {
                    shoppingCart:[product,...shoppingCart],
                    totalPrice:updatedPrice,
                    qty:updateQTY
                }
            }
            break;
        case "INC":
            product=action.product
            product.qty=product.qty+1
            updateQTY= qty+1
            updatedPrice=totalPrice+product.finalprice
            index= shoppingCart.findIndex((item)=>item.id==action.id)
            shoppingCart[index]=product
            return{
                shoppingCart:[...shoppingCart],
                    totalPrice:updatedPrice,
                    qty:updateQTY

            }
            break
        case "DEC":
            if(qty>1){
            product=action.product
            product.qty=product.qty-1
            updateQTY= qty-1
            updatedPrice=totalPrice-product.finalprice
            index= shoppingCart.findIndex((item)=>item.id==action.id)
            shoppingCart[index]=product
            return{
                shoppingCart:[...shoppingCart],
                totalPrice:updatedPrice,
                qty:updateQTY
            }
            }
            else 
                return state
            break
        case "DELETE":
            const filteredProducts =shoppingCart.filter((item)=>item.id!=action.id)
            product=action.product
            updateQTY=qty-product.qty
            updatedPrice= totalPrice-product.finalprice*product.qty
            return{
                shoppingCart:[...filteredProducts],
                totalPrice:updatedPrice,
                qty:updateQTY
            }
        default:
            return state;
    }
}