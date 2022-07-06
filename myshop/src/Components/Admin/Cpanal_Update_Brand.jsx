import React ,{useMemo,useState}from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { useNavigate,useParams } from 'react-router-dom'
export default function Cpanal_Update_Brand() {
    var navigate = useNavigate()
    var {_id} = useParams()
    var [name, setname] = useState("")

    useMemo(async()=>{
        var rawdata = await fetch("/brand/"+_id,{
            headers:{
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

                }
        })
        var result = await rawdata.json()
        if(!(result.message)){
            setname(result.name)
        }
    },[])

    function getData(e) {
        setname(e.target.value)
    }

    async function postData(e) {
        e.preventDefault()
        var item={
            name:name
        }
        var rawdata = await fetch("/brand/"+_id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                    authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

            },
            body: JSON.stringify(item)
        })
        var result = await rawdata.json()
        if (result.message=="Done")
         navigate("/admin-brand")
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
                    <h5 className='background text-light text-center p-2'>Brand</h5>
                    <form>
                        <div className="mb-3">
                            <label  className="form-label">Name</label>
                            <input type="text" onChange={getData} className="form-control" id="name" placeholder='enter brand name' value={name} />
                        </div>
                        <button type="submit" onClick={postData} className="btn background w-100 text-light">Update</button>
                    </form>
                </div>
            </div>
        </>
    ) 
}
