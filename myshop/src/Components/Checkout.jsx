import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Checkout() {
    var navigate = useNavigate()
    var [shoppingCart, setshoppingcart] = useState([])
    var [total, settotal] = useState(0)
    var [shipping, setshipping] = useState(0)
    var [final, setfinal] = useState(0)
    var [user,setUser]=useState([])
    var[mode,setmode]=useState("COD")
    async function getData() {
        var rawdata = await fetch("/register/" + localStorage.getItem("userid"),{
             headers:{
                authorization:localStorage.getItem("token"),
                 username:localStorage.getItem("username")

                }
        })
        var result = await rawdata.json()
        setUser(result)

         rawdata = await fetch("/cart/" + localStorage.getItem("userid"),{
             headers:{
                authorization:localStorage.getItem("token"),
                username:localStorage.getItem("username")
      }
         })
        result = await rawdata.json()
        if (!(result.message)) {
            setshoppingcart(result)
            var t = 0;
            for (let item of result) {
                t = t + item.total
            }
            var s = 0;
            if (t < 1000 && t != 0) {
                s = 150;
            }
            var f = t + s;
            settotal(t)
            setshipping(s)
            setfinal(f)
        }
    }

function getMode(e){
    setmode(e.target.value)
}

    async function postCheckout() {
       

        var products = []
        for (let item of shoppingCart) {
            products.push(item)
        }
        var item = {
            userid: localStorage.getItem("userid"),
            total: total,
            shipping: shipping,
            final: final,
            products: products,
            mode:mode
        }
        var rawdata = await fetch("/checkout", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                    authorization:localStorage.getItem("token"),
                      username:localStorage.getItem("username")
            },
            body: JSON.stringify(item)
        })
        var result = await rawdata.json()
        if (result.message == "Done")
        {
            rawdata= await fetch("/cart/all/"+localStorage.getItem("userid") ,{
                method:"delete",
                headers:{
                    authorization:localStorage.getItem("token"),
                     username:localStorage.getItem("username")
    }
            })
             result= await rawdata.json()
             if(mode=="COD")
            navigate("/confirmation")
            else{
                navigate("/netbanking/-1")
            }
        }
        else
            alert(result.message)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
           <div className='container-fluid mt-5'>
           <div className='row'>
            <div className='col-md-6 col-sm-12 col-12'>
            <h3 className='background text-center text-light p-2'>Billing Detail</h3>
            <table className='table table-striped table-hover table-light'>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>User Name</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Email ID</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Address Line1</th>
                  <td>{user.addressline1}</td>
                </tr>
                <tr>
                  <th>Address Line2</th>
                  <td>{user.addressline2}</td>
                </tr>
                <tr>
                  <th>Address Line3</th>
                  <td>{user.addressline3}</td>
                </tr>
                <tr>
                  <th>ZIP</th>
                  <td> {user.pin}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{user.state}</td>
                </tr>
                <tr>
                  <th colSpan={2}><Link to="/update-profile" className="btn background text-light text-center w-100">Update Profile</Link></th>
                </tr>
              </tbody>
            </table>
            </div>
                <div className='col-md-6 col-sm-12 col-12'>
                    {
                        shoppingCart.length > 0 ?
                            <>
                                <h5 className='background text-light text-center p-2'>Checkout Section</h5>
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
                                                    <th>QTY</th>
                                                    <th>Final</th>
                                                </tr>
                                                {
                                                    shoppingCart.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td><Link to={"/single-product-page/" + item.productid}><img src={"/public/media/images/" + item.pic} width="100px" height="100px" /></Link></td>
                                                            <td>{item.name}</td>
                                                            <td>{item.color}</td>
                                                            <td>{item.size}</td>
                                                            <td>&#8377;{item.price}</td>
                                                            <td>{item.qty}</td>
                                                            <td>&#8377;{item.total}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                <div className='container-fluid'>
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
                                                        <th>Mode of Payment</th>
                                                        <td>
                                                            <select name="mode" className='form-control' onChange={getMode}>
                                                                <option value="COD">COD</option>
                                                                <option value="Net Banking">Net Banking/Card/UPI/Wallet</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th colSpan={2}><button onClick={postCheckout} className='btn background text-center text-light w-100'>Place Order</button> </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                            </>
                            : <h5 className='background text-light text-center p-3 mt-5'>No Items in Cart</h5>
                    }
                </div>
            </div>
           </div>
        </>
    )
}
