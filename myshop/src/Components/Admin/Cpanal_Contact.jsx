import React, { useMemo, useState } from 'react'
import {Link   } from 'react-router-dom'
import Cpanal_LeftNav from './Cpanal_LeftNav'
export default function Cpanal_Contact() {
  var [contact,setcontact]= useState([])
  async function getData(){
    var rawdata= await fetch("/contact",{
    headers:{
      authorization:localStorage.getItem("token"),
      username:localStorage.getItem("username")

      }
    })
    var result = await rawdata.json()
      setcontact(result)
  }

  useMemo(()=>{
    getData()
  },[])

  return (
    <>
      <div className='row mt-5'>
        <div className='col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav/>
        </div>
        <div className='col-xxl-10 col-xl-9 col-lg-8 col-md-8 col-sm-6 col-12'>
        <div className='table-responsive'>
        <h5 className='background text-light  text-center p-2 w-100'>Contact Section</h5>
            <table className='table table-striped table-light table-hover '>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                     {
                        contact.map((item,index)=>{
                          return <tr key={index}>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>{item.subject.slice(0,50)+"..."}</td>
                              <td>{item.message.slice(0,25)+"..."}</td>
                              <td>{item.status}</td>
                              <td><Link to={"/admin-single-contact/"+item._id} className='btn'><a className='material-icons'>visibility</a></Link></td>
                          </tr>
                        })
                     }
                </tbody>
            </table>
          
          </div>
          </div>
        </div>
    </>
  )
}
