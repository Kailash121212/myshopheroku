import React ,{useState,useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
export default function Cart() {
   var [shoppingCart,setshoppingcart]=useState([])
   var [total,settotal]= useState(0)
   var [shipping,setshipping]=useState(0)
   var [final,setfinal]= useState(0)
  
    async function getData(){
        var rawdata = await fetch("/cart/" + localStorage.getItem("userid"),{
            headers:{
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

                }
        })
            var result = await rawdata.json()
            if (!(result.message)) {
                setshoppingcart(result)
                var t= 0;
                for(let item of result){
                    t=t+item.total
                }
                var s=0;
                if(t<1000 && t!=0){
                    s= 150;
                }
                var f= t+s;
                settotal(t)
                setshipping(s)
                setfinal(f)
            }
       }

   async function deleteCart(_id){
  var rawdata= await fetch("/cart/"+_id,{
    method:"delete",
    headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
  })
  var result= await rawdata.json()
  if(result.message=="Done"){
    getData()
  }
}

async function updateCart(_id,num){
    var cart= shoppingCart.find((item)=>item._id==_id)
    if(num==1){
        var q= cart.qty+1
        var fp= cart.total+cart.price
    }
    else if(num==-1 && cart.qty>1){
        var q=cart.qty-1
        var fp= cart.total- cart.price
    }
    else{
        return
    }
    var item={
        qty:q,
        total:fp
    }
    var rawdata= await fetch("/cart/"+_id,{
      method:"put",
      headers:{
        "Content-type":"application/json",
            authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      },
      body:JSON.stringify(item)
    })
    var result= await rawdata.json()
    if(result.message=="Done"){
      getData()
    }
  }

  useEffect(()=>{
    getData()
},[])
    return (
    <>
        {
            shoppingCart.length>0?
            <>
            <h5 className='background text-light text-center p-2 mt-5'>Cart Component</h5>
            <div className=''>
                <div className='table-responsive'>
                    <table className='table table-light table-stripped table-hover' >
                        <tbody>
                           <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th></th>
                            <th>QTY</th>
                            <th></th>
                            <th>Total</th>
                            <th></th>
                           </tr>
                            {
                             shoppingCart.map((item,index)=>{
                                return <tr key={index}>
                                    <td><Link to={"/single-product-page/"+item.productid}><img src={"/public/media/images/"+item.pic} width="100px" height="100px"/></Link></td>
                                    <td>{item.name}</td>
                                    <td>{item.color}</td>
                                    <td>{item.size}</td>
                                    <td>&#8377;{item.price}</td>
                                    <td><button className='btn text-primary' onClick={()=>updateCart(item._id,-1)}><i className="material-icons">remove</i></button></td>
                                    <td>{item.qty}</td>
                                    <td><button className='btn text-primary'  onClick={()=>updateCart(item._id,1)}><i className="material-icons">add</i></button></td>
                                    <td>{item.total}</td> 
                                    <td><button className='btn text-primary' onClick={()=>deleteCart(item._id)} ><i className="material-icons">delete</i></button></td>
                                </tr>

                             })   
                            }


                        </tbody>
                    </table>

                </div>
            </div>
           <div className='container-fluid'>
           <div className='row'>
             <div className='col-md-6 col-sm-12 col-12'></div>
             <div className='col-md-6 col-sm-12 col-12'>
                <table className='table table-striped table-light table-hover'>
                    <tbody>
                    <tr>
                        <th>Total</th>
                        <td>&#8377;{total}</td>
                    </tr>
                    <tr>
                        <th>Shipping Charge</th>
                        <td>&#8377;{shipping}</td>
                    </tr>
                    <tr>
                        <th>Final Amount</th>
                        <td>&#8377;{final}</td>
                    </tr>
                    <tr>
                    <th colSpan={2}><Link to="/checkout" className='btn background text-center text-light w-100'>Checkout</Link></th>
                     </tr>
                    </tbody>
                </table>
             </div>
            </div>
           </div>
            </>
            :<h5 className='background text-light text-center p-3 mt-5'>No Items in Cart</h5>
        }      
    </>
  )
}
