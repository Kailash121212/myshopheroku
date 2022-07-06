import React,{useState,useEffect} from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import { Link } from 'react-router-dom'

export default function Cpanal_Product() {
  var [product,setproduct]=useState([])
  
  async function getData(e){
    var rawdata= await fetch("/product",{
      headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
    })
    var result= await rawdata.json()
    if(!(result.message)){
      setproduct(result)    
    }
}

async function deleteData(_id){
  var rawdata= await fetch("/product/"+_id,{
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
        <h5 className='background text-light text-center p-2'>Product Section<Link to="/admin-add-product" className="btn text-light"><i className="fa fa-plus text-light "></i></Link></h5>
            <div className='table-responsive'>
            <table className='table table-striped table-light w-100 table-hover'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Maincategory</th>
                        <th>subcategory</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Base Price</th>
                        <th>Discount</th>
                        <th>Final Price</th>
                        <th>Stock</th>
                        <th>pic1</th>
                        <th>pic2</th>
                        <th>pic3</th>
                        <th>pic4</th>
                        <th></th>
                        <th></th>
                    </tr>
                    
                    {product.map((item,index)=>{
                      return <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.maincategory}</td>
                          <td>{item.subcategory}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}</td>
                          <td>{item.size}</td>
                          <td>{item.baseprice}</td>
                          <td>{item.discount}</td>
                          <td>{item.finalprice}</td>
                          <td>{item.stock}</td>
                          <td><img  src={"http://localhost:8000/public/media/images/"+item.pic1} height="100px" width="100px" /></td>
                          <td><img  src={"http://localhost:8000/public/media/images/"+item.pic2} height="100px" width="100px" /></td>
                          <td><img  src={"http://localhost:8000/public/media/images/"+item.pic3} height="100px" width="100px" /></td>
                          <td><img  src={"http://localhost:8000/public/media/images/"+item.pic4} height="100px" width="100px" /></td>
                          <td><Link to={"/admin-update-product/"+item._id} className='btn text-primary' ><i className="material-icons">upgrade </i></Link></td>
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
