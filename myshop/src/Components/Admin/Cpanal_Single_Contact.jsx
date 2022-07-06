import React, { useState, useEffect } from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link,useParams } from 'react-router-dom'

export default function Cpanal_Single_Contact() {
  var [contact, setcontact] = useState({})
  var [status,setstatus]= useState("")
    var {_id}=useParams()

  async function getAPIData() {
    var rawdata = await fetch("/contact/"+_id,{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result = await rawdata.json()
    if (result.message) {
      setcontact(result)
      setstatus(result.status)
    }
  }

  function getData(e){
    setstatus(e.target.value)
  }

  async function postData(e){
    e.preventDefault()
    var item={
        status:status,
    }
    var rawdata = await fetch("/contact/"+_id,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
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
        <div className='col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav />
        </div>
        <div className='col-xxl-10 col-xl-9 col-lg-10 col-md-8 col-sm-6 col-12'>
          <h6 className='background text-light text-center p-2'>Contact details </h6>
          <table className='table table-striped table-light w-100 table-hover'>
            <tbody>
              <tr>
                <th>Name</th>
                    <td>{contact.name}</td>
              </tr>
              <tr>
              <th>Email Id</th>
                    <td>{contact.email}</td>
              </tr>
                <tr>
                <th>Phone Number</th>
                    <td>{contact.phone}</td>
                </tr>
               <tr>
               <th>Subject</th>
                    <td>{contact.subject}</td>
               </tr>
               <tr>
               <th>message</th>
                    <td>{contact.message}</td>
               </tr>

               <tr>
                <th>status</th>
                    <td>
                    {contact.status}
                    <br/>
                    {contact.status=="Done" ? " ":<>
                    <select name="status" onChange={getData} className='form-control'>
                        <option value="Active">Active</option>
                        <option value="Done">Done</option>
                     </select>
                    <button onClick={postData} className='btn background text-light w-100 mb-2'>Update</button>
                    </>
                    }
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
