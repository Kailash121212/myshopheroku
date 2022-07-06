import React, { useState } from 'react'

export default function Footer() {
var [email,setemail]=useState("")
function getData(e){
  setemail(e.target.value)
}
async function postData(e){
  e.preventDefault()
  var item={
    email:email
  }
  var rawdata= await fetch("/newslatter",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
        authorization:localStorage.getItem("token")
    },
    body:JSON.stringify(item)
  })
  var result= await rawdata.json()
  if(result.message=="Done")
 { alert("Thanks to register your Email!! Now you can get email about your new and latest product")
  }
  else
  alert("your email id already registred")

}


  return (
    <>
    <div className='container-fluid background text-center p-3 text-light bottom-fixed'>
      <p>copyright@Myshop.com</p>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <form onSubmit={postData}>
            <div className='mb-3'> 
            <label htmlFor="email" className='form-label mb-2'>Email address</label>
            <input type="email" className=" form-control mt-3" onChange={getData} name="email" placeholder="enter your email address for new notification" />
            </div>
            <button type='submit' className='btn bg-success w-100 text-light'> submit</button>
          </form>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
    </>
  )
}
