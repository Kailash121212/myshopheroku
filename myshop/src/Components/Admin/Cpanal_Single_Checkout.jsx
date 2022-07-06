import React, { useState, useEffect } from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link,useParams } from 'react-router-dom'

export default function Cpanal_Single_Checkout() {
  var [checkout, setcheckout] = useState([])
  var [products,setproducts]= useState([])
  var [status,setstatus]= useState("")
  var [payment,setpayment]= useState("")

var {_id}=useParams()

  async function getAPIData() {
    var rawdata = await fetch("/checkout/single/"+_id,{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result = await rawdata.json()
    if (!(result.message)) {
      setcheckout(result)
      setproducts(result.products)
      setstatus(result.orderstatus)
      setpayment(result.paymentstatus)
    }
  }

  function getData(e){
    if(e.target.name=="status")
    setstatus(e.target.value)
    else
    setpayment(e.target.value)
  }

  async function postData(e){
    e.preventDefault()
    var item={
        status:status,
        paymentstatus:payment
    }
    var rawdata = await fetch("/checkout/"+_id,{
        method:"put",
        headers:{
            "content-type":"application/json",
              authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        },
        body:JSON.stringify(item)
    })
  var result= await rawdata.json()
  if(result.message=="Done")
  getAPIData()
  else
  alert(result.message)
}


  useEffect(() => {
    getAPIData()
  }, [])

  return (
    <>
      <div className='row mt-5'>
        <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav />
        </div>
        <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
        <h5 className='background text-light text-center p-2'>Checkout Section </h5>
          <table>
            <tbody className='table '>
                <tr>
                    <th>Order Id</th>
                    <td>{checkout._id}</td>
                </tr>
                <tr>
                    <th>user Id</th>
                    <td>{checkout.userid}</td>
                </tr>
            </tbody>
          </table>
          <h6 className='background text-light text-center p-2'>Order Status </h6>
          <table className='table table-striped table-light w-100 table-hover'>
            <tbody>
              <tr>
                 
                <th>Payment Mode</th>
                <th>Order status</th>
                <th>Payment Status</th>
                <th>Total</th>
                <th>Shipping</th>
                <th>Final</th>
              </tr>
               <tr>
                    <td>{checkout.mode}</td>
                    <td>
                    {checkout.status}
                    <br/>
                    {checkout.status=="Delivered" ? " ":<select name="status" onChange={getData} className='form-control'>
                        <option value="not packed">Not packed</option>
                        <option value="packed">packed</option>
                        <option value="out for delivery">out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>}
                    </td>
                    <td>{checkout.paymentstatus}
                    <br/>
                    {checkout.paymentstatus=="Done"?" ": <select name="payment" onChange={getData} className='form-control'>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>}
                    </td>
                    <td>&#8377;{checkout.total}</td>
                    <td>&#8377;{checkout.shipping}</td>
                    <td>&#8377;{checkout.final}</td>
                </tr>
            </tbody>
          </table>

          {
            checkout.paymentstatus=="Done" && checkout.status =="Delivered"? 
            "":<button onClick={postData} className='btn background text-light w-100 mb-2'>Update</button>
          }
          <h6 className='background text-light text-center p-2'>Order Product </h6>
          <table className='table table-striped table-light w-100 table-hover'>
            <tbody>
              <tr>
                 
                <th></th>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
                {
                products.map((item,index)=>{
                        return <tr key={index}>
                            <td><img src={"/public/media/images/"+item.pic} className="w-100" height="100px" alt='...'/></td>
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
    </>
  )
}
