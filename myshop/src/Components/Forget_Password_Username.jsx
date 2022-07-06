import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/forget.jpg"
export default function Forget_Password_Username() {
  var navigate= useNavigate()
  var [username,setusername]=useState("")

  function getData(e){
    setusername(e.target.value)
  }

  async function postData(e){
    e.preventDefault()
    var rawdata= await fetch("/forget-password-username/"+username)
    var result= await rawdata.json()
    console.log(result);
    console.log(username);
    if(result.message=="Done"){
      localStorage.setItem("OTP",result.OTP)
      localStorage.setItem("RestUser",username)
      navigate("/forget-password-OTP")
    } 
    else{
        alert( "username not Found")
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
              <label className="form-label">User Name</label>
              <input type="text" className="form-control" name="username" onChange={getData} required placeholder='enter your user name to reset password'/>
            </div>
            <button type="submit" className="btn w-100 background text-light text-center border rounded-pill" onClick={postData}>send</button>
          </form>
        </div>
      </div>
    </>
  )
}
