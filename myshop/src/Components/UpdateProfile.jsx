
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import pic from "../Asserts/images/nopic.jpg"
export default function Update_Profile() {
    var navigate = useNavigate()
    var [register, setregister] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        addressline1: "",
        addressline2: "",
        addressline3: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    useMemo(async () => {
        var rawdata = await fetch("/register/" + localStorage.getItem("userid"), {
            headers: {
                authorization: localStorage.getItem("token"),
                username:localStorage.getItem("username")
            }
        })
        var result = await rawdata.json()
        setregister(result)
    }, [])
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setregister((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0]
        setregister((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var formData = new FormData()
        formData.append("name", register.name)
        formData.append("email", register.email)
        formData.append("phone", register.phone)
        formData.append("addressline1", register.addressline1)
        formData.append("addressline2", register.addressline2)
        formData.append("addressline3", register.addressline3)
        formData.append("pin", register.pin)
        formData.append("city", register.city)
        formData.append("state", register.state)
        formData.append("pic", register.pic)
        var rawdata = await fetch("/register/" + localStorage.getItem("userid"), {
            method: "put",
            body: formData,
            headers: {
                authorization: localStorage.getItem("token"),
                username:localStorage.getItem("username")
            }
        })
        var result = await rawdata.json()
        console.log(result.message);
        console.log(result);
        if (result.message == "Done")
            navigate("/profile")
        else
            console.log(result.message)
    }
    return (
        <>
            <div className='container-fluid mb-2 mt-5'>
                <div className='row'>
                    <div className='col-sm-6 col-12'>
                        {register.pic ? <img src={"/public/media/images/" + register.pic} className="w-100"></img> : <img src={pic} className="w-100"></img>}
                    </div>
                    <div className='col-sm-6 col-12'>
                        <h5 className='background text-light text-center p-2'>Update Profile Section</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" onChange={getData} name="name" placeholder='Enter Name' value={register.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" onChange={getData} name="email" placeholder='Enter Email id' value={register.email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" onChange={getData} name="phone" placeholder='Enter Phone Number' value={register.phone} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addressline1" className="form-label">Address Line 1</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline1" placeholder='Enter House,Floor and Building Number' value={register.addressline1} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addressline2" className="form-label">Address Line 2</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline2" placeholder='Enter Street Number or Landmark Number' value={register.addressline2} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addressline3" className="form-label">Address Line 3</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline3" placeholder='Enter Village or Locality Number' value={register.addressline3} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pin" className="form-label">Pin</label>
                                <input type="text" className="form-control" onChange={getData} name="pin" placeholder='Enter pin Number' value={register.pin} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" onChange={getData} name="city" placeholder='Enter city Name' value={register.city} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" onChange={getData} name="state" placeholder='Enter state Name' value={register.state} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pic" className="form-label">pic</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic" />
                            </div>
                            <button type="submit" className="btn background text-light w-100" onClick={postData}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}



