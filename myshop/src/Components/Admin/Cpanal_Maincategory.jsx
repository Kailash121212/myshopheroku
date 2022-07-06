import React,{useState,useEffect} from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link } from 'react-router-dom'

export default function Cpanal_Maincategory() {
  var [maincategory,setmaincategory]=useState([])
  
  async function getData(e){
    var rawdata= await fetch("/maincategory",{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result= await rawdata.json()
    if(!(result.message)){
      setmaincategory(result)    
    }
}

async function deleteData(_id){
  var rawdata= await fetch("/maincategory/"+_id,{
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
        <div className='col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav/>
        </div>
        <div className='col-xxl-10 col-xl-9 col-lg-8 col-md-8 col-sm-6 col-12'>
        <h5 className='background text-light text-center p-2 w-100'>Maincategory Section<Link to="/admin-add-maincategory" className="btn text-light"><i className="fa fa-plus text-light "></i></Link></h5>
            <div className='table-responsive'>
            <table className='table table-striped table-light w-100 table-hover'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                    
                    {maincategory.map((item,index)=>{
                      return <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td><Link to={"/admin-update-maincategory/"+item._id} className='btn text-primary' ><i className="material-icons">upgrade </i></Link></td>
                          <td><button onClick={()=>window.confirm("are you sure to delete!!!")? deleteData(item._id):""} className='btn text-primary'><i className="material-icons">delete_forever</i></button></td>
                          </tr>
                    }
                    )}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </>
  )
}
