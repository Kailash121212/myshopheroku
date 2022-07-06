import React,{useState,useEffect} from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link } from 'react-router-dom'

export default function Cpanal_Brand() {
  var [brand,setbrand]=useState([])
  
  async function getData(e){
    var rawdata= await fetch("/brand",{
    headers:{
      authorization:localStorage.getItem("token"),
      username:localStorage.getItem("username")

      }
    })
    var result= await rawdata.json()
    if(!(result.message)){
      setbrand(result)    
    }
}

async function deleteData(_id){
  var rawdata= await fetch("/brand/"+_id,{
    method:"delete",
    headers:{
    authorization:localStorage.getItem("token"),
    username:localStorage.getItem("username")

    }
  })
  var result= await rawdata.json()
  if(result.message=="Done"){
    getData()
  }
}

useEffect(()=>{
  getData()
},[])

  return (
    <>
       <div className='row mt-5'>
        <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav/>
        </div>
        <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
        <h5 className='background text-light text-center p-2'>Brand Section<Link to="/admin-add-brand" className="btn text-light"><i className="fa fa-plus text-light "></i></Link></h5>
            <table className='table table-striped table-light w-100 table-hover'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                    
                    {brand.map((item,index)=>{
                      return <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td><Link to={"/admin-update-brand/"+item._id} className='btn text-primary' ><i className="material-icons">upgrade </i></Link></td>
                          <td><button onClick={()=>window.confirm("are you sure to delete!!!")? deleteData(item._id):""} className='btn text-primary'><i className="material-icons">delete_forever</i></button></td>
                          </tr>
                    }
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}
