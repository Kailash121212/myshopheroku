import React,{useState,useEffect} from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link } from 'react-router-dom'

export default function Cpanal_UserList() {
  var [register,setregister]=useState([])
  
  async function getData(e){
    var rawdata= await fetch("/register",{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result= await rawdata.json()
    if(!(result.message)){
      setregister(result)    
    }
}

async function deleteData(_id){
  var rawdata= await fetch("/register/"+_id,{
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

useEffect(()=>{
  getData()
},[])

  return (
    <>
       <div className='row mt-5'>
        <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav/>
        </div>
        <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
        <h5 className='background text-light text-center p-2'>User Section</h5>
            <div  className='table-responsive'>
            <table className='table table-striped table-light w-100 table-hover'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                    
                    {register.map((item,index)=>{
                      return <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td><button onClick={()=>window.confirm("are you sure to delete!!!")? deleteData(item._id):""} className='btn btn-primary'><i className="material-icons">delete_forever</i></button></td>
                          </tr>
                    }
                    )}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </>
  )
}
