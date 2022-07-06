import React, { useState, useEffect } from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link } from 'react-router-dom'

export default function Cpanal_Checkout() {
  var [checkout, setcheckout] = useState([])

  async function getData() {
    var rawdata = await fetch("/checkout",{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result = await rawdata.json()
    if (!(result.message)) {
      setcheckout(result)
    }
  }

  useEffect(() => {
    getData()
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
          <table className='table table-striped table-light w-100 table-hover'>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Payment Mode</th>
                <th>Order status</th>
                <th>Payment Status</th>
                <th>Total</th>
                <th>Shipping</th>
                <th>Final</th>
                <th></th>
              </tr>

              {checkout.map((item, index) => {
                return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.mode}</td>
                    <td>{item.status}</td>
                    <td>{item.paymentstatus}</td>
                    <td>{item.total}</td>
                    <td>{item.shipping}</td>
                    <td>{item.final}</td>
                    <td><Link to={"/admin-single-checkout/" + item._id} className='btn'><i className='material-icons'>visibility</i> </Link></td>
                </tr>
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
