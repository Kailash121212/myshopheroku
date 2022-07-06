import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/nopic.jpg"
export default function Login() {
  var navigate= useNavigate()
  var [login,setlogin]=useState({
    username:"",
    password:""
  })

  function getData(e){
    var name= e.target.name
    var value= e.target.value
    setlogin((olddata)=>{
      return{
        ...olddata,
        [name]:value
      }
    })
  }

  async function postData(e){
    e.preventDefault()
    var item= {
      username:login.username,
      password:login.password
    }
    var rawdata= await fetch("/login",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
          authorization:localStorage.getItem("token")
      },
      body:JSON.stringify(item)
    })
    var result= await rawdata.json()
    if(result.message!="Done"){
      alert(result.message)
    } 
    else {
      localStorage.setItem("token",result.token)
      localStorage.setItem("username",result.user.username)
      localStorage.setItem("userid",result.user._id)
      localStorage.setItem("role",result.user.role)
      localStorage.setItem("login","true")
        if(result.role=="Admin"||"admin"){
          navigate("/admin")
        }
         else{
           navigate("/profile")
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
        <h5 className='background text-center text-light w-100 p-2 border rounded-pill'>Login Section</h5>
          <form>
            <div className="mb-3">
              <label   className="form-label">User Name</label>
              <input type="text" className="form-control" name="username" onChange={getData} placeholder='enter your user name to login'/>
            </div>
            <div className="mb-3">
              <label   className="form-label">Password</label>
              <input type="password" className="form-control" name="password" onChange={getData}  placeholder='enter the password'/>
            </div>
            <button type="submit" className="btn w-100 background text-light text-center border rounded-pill" onClick={postData}>Login</button>
            <div className='d-flex justify-content-between'>
            <Link to="/forget-password-username" className='text-decoration-none'>Forget Password?</Link>
            <Link to="/signup" className='text-decoration-none'>New User? Create a free Account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
