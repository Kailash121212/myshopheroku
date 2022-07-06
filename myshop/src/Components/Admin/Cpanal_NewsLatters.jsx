import React, {useMemo ,useState } from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
export default function Cpanal_NewsLatter() {
    var[newslatter,setnewlatter]=useState([])
    async function getData(){
        var rawdata= await fetch("/newslatter",{
            headers: {
                authorization: localStorage.getItem("token"),
        username:localStorage.getItem("username")

            }
        })
        var result= await rawdata.json()
        if(!(result.message)){
            setnewlatter(result)
        }
    }
    async function deleteData(_id){
        var rawdata= await fetch("/newslatter/"+_id,{
            method:"delete",
            headers: {
                authorization: localStorage.getItem("token"),
        username:localStorage.getItem("username")

            }
        })
        var result = await rawdata.json()
        if(result.message=="Done"){
            getData()
        }
    }
    useMemo(()=>{
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
        <h5 className='background text-light text-center p-2'>News Latter Section</h5>
            <table className='table table-striped table-light table-hover'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
  
                    {
                        newslatter.map((item,index)=>{
                            return <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.email}</td>
                                <td><button className='btn text-primary' onClick={()=>window.confirm(`are you sure to delete!!! ${item.email}`)? deleteData(item._id):""} ><i className='material-icons'>delete_forever</i></button></td>
                            </tr>
                        })
                    }


          
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}
