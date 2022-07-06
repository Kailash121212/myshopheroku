import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/forget.jpg"
export default function Forget_Password_Reset() {
  var navigate= useNavigate()
  var [details,setdetails]=useState({
    password:" ",
    cpassword:" "
  })

  function getData(e){
    var name= e.target.name
    var value= e.target.value
    setdetails((olddata)=>{
      return{
        ...olddata,
        [name]:value
      }
    })
  }

  async function postData(e){
    e.preventDefault()
    
    if(details.password == details.cpassword){
        var item= {
      password:details.password,
      username:localStorage.getItem("ResetUSer")
    }
    console.log(item);
    var rawdata= await fetch("/Forget-password-reset",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(item)
    })
    var result= await rawdata.json()
    if(result.message=="Done"){
        navigate("/login")
    }else{
        alert("something went wrong")
    }
}

}
  return (
    <>
      <div className='row mt-5'>
        <div className='col-md-6 col-sm-12 col-12'>
          <img src={pic} alt="profile pic" height="300px" className="w-100"></img>
        </div>
        <div className='col-md-6 col-sm-12 col-12'>
        <h5 className='background text-center text-light w-100 p-2 border rounded-pill'>Forget Password Section</h5>
          <form>
           
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required name="password" onChange={getData}  placeholder='enter the password'/>
            </div>
            <div className="mb-3">
              <label   className="form-label">Confirm Password</label>
              <input type="cpassword" className="form-control" required name="cpassword" onChange={getData}  placeholder='enter the confirm password'/>
            </div>
            <button type="submit" className="btn w-100 background text-light text-center border rounded-pill" onClick={postData}>submit</button>
            
          </form>
        </div>
      </div>
    </>
  )
}


