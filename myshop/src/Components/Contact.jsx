import React, { useState } from 'react'
export default function Contact() {
    var [contact,setcontact]=useState({
        name:"",
        email:"",
        phone:"",
        subject:"",
        message:""
    })

    function getData(e){
        var name= e.target.name
        var value= e.target.value
        setcontact((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    async function postData(e){
        e.preventDefault()
        var item={
            name:contact.name,
            email:contact.email,
            phone:contact.phone,
            subject:contact.subject,
            message:contact.message
        }
        var rawdata= await fetch("/contact",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(item)
        })
        var result= await rawdata.json()
        if(result.message=="Done"){
            alert("Thanks to contact us!!! our team will contact you soon")
        }
        else{
            alert("Detail is wrong")
        }
    }


    return (
        <>
            <div className='row mt-5'>
               <div className='col-md-6 col-sm-12 col-12'>
               <div className='container-fluid'>
                    <div className='background text-light text-center p-3 w-100 mt-2'>
                        Rameshnegi@gmail.com
                    </div>
                    <div className='background text-light text-center p-3 w-100 mt-2'>
                        8476062036 
                    </div>
                    <div className='background text-light text-center p-3 w-100 mt-2'>
                        Sector 16, noida,up
                    </div>
                    <div className='w-100 mt-3 mb-3'>
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="450" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=Noida%20sector%2062&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            </iframe></div></div>
                    </div>
                </div>
               </div>
            <div className='col-md-6 col-sm-12 col-12'>
                <h5 className='background text-center text-light w-100 p-2 border rounded-pill'>Contact Section</h5>
                <form onSubmit={postData} method="post">
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={getData} placeholder='enter the name' />
                    </div>
                    <div className="mb-3">
                        <label  htmlFor='email' className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onChange={getData} placeholder='enter the Email id' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='phone'  className="form-label">Contact Number</label>
                        <input type="number" className="form-control" name="phone" onChange={getData} placeholder='enter the Contact Numbber' />
                    </div>
                    <div className="mb-3">
                        <label  htmlFor='subject' className="form-label">Subject</label>
                        <input type="text" className="form-control" name="subject" onChange={getData} placeholder='enter the name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='message' className="form-label">Message</label>
                        <textarea type="text" className="form-control" name="message" onChange={getData} placeholder='enter your message'></textarea>
                    </div>  
                    <button type="submit" className="btn w-100 background text-light text-center border rounded-pill mb-2">Send</button>
                </form>
            </div>
        </div>
    </>
  )
}


