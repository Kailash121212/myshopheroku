import React ,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/nopic.jpg"


export default function Signup() {
  var navigate= useNavigate()
var [register,setregister]=useState({
  name:"",
  username:"",
  email:"",
  phone:"",
  password:"",
  cpassword:""
})

function getData(e){
  var name= e.target.name
  var value= e.target.value
  setregister((olddata)=>{
    return{
      ...olddata,
      [name]:value
    }
  })
}

async function postData(e){
  e.preventDefault()
  if(register.password!== register.cpassword)
  alert("password and confirm password dosen,t match")
  else{
  var item= {
    name:register.name,
    username:register.username,
    email:register.email,
    phone:register.phone,
    password:register.password,
   
  }
  var rawdata= await fetch("/register",{
    method:"post",
    headers:{
     "Content-type":"application/json",
    },
    body:JSON.stringify(item)
  })
  var result= await rawdata.json()
  if(result.message=="Done")
  {navigate("/login")
  alert("Your Account has been created kindly login")}
  else
  alert(result.message.error)
}
  
}
  return (
    <>
      <div className='row mt-5'>
        <div className='col-md-6 col-sm-12 col-12'>
          <img src={pic} alt="profile pic" height="300px" className="w-100"></img>
        </div>
        <div className='col-md-6 col-sm-12 col-12'>
        <h5 className='background text-center text-light w-100 p-2 border rounded-pill'>Signup Section</h5>
          <form>
            <div className="mb-3">
              <label  className="form-label">Name</label>
              <input type="text" className="form-control" name="name" placeholder='enter the name' onChange={getData}/>
            </div>
            <div className="mb-3">
              <label   className="form-label">User Name</label>
              <input type="text" className="form-control" name="username" onChange={getData} placeholder='enter the user name'/>
            </div>
            <div className="mb-3">
              <label  className="form-label">Email</label>
              <input type="email" className="form-control" name="email"  onChange={getData} placeholder='enter the Email id'/>
            </div>
            <div className="mb-3">
              <label   className="form-label">Phone</label>
              <input type="number" className="form-control" name="phone" onChange={getData}  placeholder='enter the Contact Numbber'/>
            </div>
            <div className="mb-3">
              <label  className="form-label">Password</label>
              <input type="password" className="form-control" name="password" onChange={getData} placeholder='enter your Password'/>
            </div>
            <div className="mb-3">
              <label  className="form-label">Confirm Password</label>
              <input type="password" className="form-control" name="cpassword" onChange={getData} placeholder='enter  confirm password'/>
            </div>
            <button type="submit" className="btn w-100 background text-light text-center border rounded-pill" onClick={postData}>Signup</button>
            <Link to="/login" className='text-decoration-none'>Already user? login account</Link>
          </form>
        </div>
      </div>
    </>
  )
}
