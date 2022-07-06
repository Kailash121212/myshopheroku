import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cpanal_LeftNav from './Cpanal_LeftNav'
export default function Cpanal_Add_Maincategory() {
    var navigate= useNavigate()
  var [name,setname]=useState("")

  function getData(e){
   setname(e.target.value)
  }

  async function postData(e){
    e.preventDefault()
    var item={
       name:name
    }
    var rawdata= await fetch("/maincategory",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

      },
      body:JSON.stringify(item)
    })
    var result= await rawdata.json()
    if(result.message=="Done")
        navigate("/admin-maincategory")
    else
        alert(result.message)
}


    return (
        <>
            <div className='row mt-5'>
                <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Menu</h5>
                    <Cpanal_LeftNav />
                </div>
                <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Maincategory Section</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor='name' className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={getData} id="name" placeholder='enter maincategory name'/>
                        </div>
                        <button type="submit" className="btn background w-100 text-light" onClick={postData}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    ) 
}
