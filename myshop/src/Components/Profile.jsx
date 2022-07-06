import React, { useState, useEffect, useMemo } from 'react'
import pic from '../Asserts/images/noimage.jpg'
import { Link } from 'react-router-dom'
export default function Profile() {
  var [wishlist, setwishlist] = useState([])
  var [user, setUser] = useState([])
  var[order,setorder]= useState([])
  async function getData() {
    var rawdata = await fetch("/register/" + localStorage.getItem("userid"),{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      }
    })
    var result = await rawdata.json()
    setUser(result)

    rawdata = await fetch("/wishlist/" + localStorage.getItem("userid"),{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      }
    })
    result = await rawdata.json()
    setwishlist(result)

    rawdata = await fetch("/checkout/" + localStorage.getItem("userid"),{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      }
    })
    result = await rawdata.json()
    setorder(result)
  }

  useMemo(async () => {
    getData()
  }, [])

  async function deleteWishlist(_id) {
    var rawdata = await fetch("/wishlist/" + _id, {
      method: "delete",
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      }
    })
    var result = await rawdata.json()
    if (result.message == "Done") {
      getData()
    }
  }


  return (
    <>
      <div className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-md-6 col-sm-12 col-12'>
            {user.pic ? <img src={"/public/media/images/"+user.pic} className="w-100" height="500px" alt='...'></img> : <img src={pic} className="w-100" height="500px" alt='...'></img>}
          </div>
          <div className='col-md-6 col-sm-12 col-12'>
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
        </div>
      </div>
      <h4 className='background text-center text-light p-2 mt-2 '>Wishlist Section</h4>
      {
        wishlist.length > 0 ?
          <>
            <h5 className='background text-light text-center p-2'>Cart Component</h5>

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
                    <th></th>
                  </tr>
                  {
                    wishlist.map((item, index) => {
                      return <tr key={index}>
                        <td><Link to={"/single-product-page/" + item.produdctid}><img src={"/public/media/images/" + item.pic} width="100px" height="100px" /></Link></td>
                        <td>{item.name}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>&#8377;{item.price}</td>
                        <td><Link to={"/single-product-page/" + item.productid} className='btn text-primary' ><i className="material-icons">shopping_cart</i></Link></td>
                        <td><button className='btn text-primary' onClick={() => deleteWishlist(item._id)} ><i className="material-icons">delete</i></button></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>

          </>
          : <h5 className='background text-light text-center p-2'>No Items in Wishlist</h5>
      }
      <h4 className='background text-center text-light p-2 mt-2 '>Order History Section</h4>
      {
        order.length > 0 ?
          <>
            <div className='table-responsive'>
            {
              order.map((item,index)=>{
                return(
                  <>
                    <div className='row'>
                      <div className=' col-md-4 col-sm-12 col-12'>
                      <table className='table table-striped table-light table-hover'>
                        <tbody>
                          <tr>
                            <th>Order Id</th>
                            <td>{item._id}</td>
                          </tr>
                          <tr>
                            <th>Payment Mode</th>
                            <td>{item.mode}</td>
                          </tr>
                          <tr>
                            <th>Order status</th>
                            <td>{item.status}</td>
                          </tr>
                          <tr>
                            <th>Payment status</th>
                            <td>{item.paymentstatus=="Done"?"Done":<Link to={"/netbanking/"+item._td} className='btn background'>Pay Now</Link>}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>&#8377;{item.total}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>&#8377;{item.shipping}</td>
                          </tr>
                          <tr>
                            <th>Final</th>
                            <td>{item.final}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      <div className=' col-md-8 col-sm-12 col-12'>
                       <table className='table table-light table-hover table-stripped'>
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
                        item.products.map((i,index)=>{
                          return <tr key={index}>
                              <td><img src={"/public/media/images/"+i.pic}  className="w-100" height="200px" alt='...' /></td>
                              <td>{i.name}</td>
                              <td>{i.color}</td>
                              <td>{i.size}</td>
                              <td>{i.price}</td>
                              <td>{i.qty}</td>
                              <td>{i.total}</td>
                            </tr>
                          
                        })
                       }
                       </tbody>
                       </table>
                      </div>
                      <hr style={{border:"10px solid gray"}}/>
                    </div>
                  </>
                )
              })
            }
            </div>

          </>
          : <h5 className='background text-light text-center p-2'>No Order History</h5>
      }
    </>
  )
}
