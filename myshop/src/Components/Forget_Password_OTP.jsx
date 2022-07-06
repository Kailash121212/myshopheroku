import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/forget.jpg"
export default function Forget_Password_OTP() {
  var navigate= useNavigate()
  var [otp,setotp]=useState("")

  function getData(e){
    setotp(e.target.value)
  }

  async function postData(){
  if(otp==localStorage.getItem("OTP")){
      navigate("/forget-password-reset/")
    } 
    else{
        alert( "OTP is not valid kindly check email")
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
              <label   className="form-label">OTP</label>
              <input type="text" className="form-control" name="OTP" onChange={getData} required placeholder='enter OTP which is send on your Registered Email Address'/>
            </div>
            <button type="submit" className="btn w-100 background text-light text-center border rounded-pill" onClick={postData}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}


