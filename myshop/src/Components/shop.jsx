import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductList from './ProductList';

export default function Shop() {
  var {mc,sc,br,q}= useParams();
  var [maincategory,setmaincategory]=useState([])
  var [subcategory,setsubcategory]=useState([])
  var [brand,setbrand]=useState([])

  useEffect(async () => {
    var rawdata = await fetch("http://localhost:8000/maincategory")
    var result = await rawdata.json()
    setmaincategory(result)

    var rawdata = await fetch("http://localhost:8000/subcategory")
    var result = await rawdata.json()
    setsubcategory(result)

    var rawdata = await fetch("http://localhost:8000/brand")
    var result = await rawdata.json()
    setbrand(result)
}, [])

  return (
    <>
      <div className="container-fluid">
        <div className='row mt-5'>
          <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
            <h5 className='bg-primary text-center  mt-2 p-2'> Left Menu</h5>

           <div className="list-group">
                <p className="background text-light p-2 mb-2">Main-Category</p>
                <Link to={"/shop/All"+"/"+sc+"/"+br} className="list-group-item list-group-item-action">All</Link>
                {maincategory.map((item,index)=>{
                    return <Link key={index} to={"/shop/"+item.name+"/"+sc+"/"+br} className="list-group-item list-group-item-action">{item.name}</Link>
                })}
            </div>
            <div className="list-group">
            <p className="background text-light p-2 mb-2">Sub-Category</p>
                <Link to={"/shop/"+mc+"/All"+"/"+br} className="list-group-item list-group-item-action">All</Link>
                {subcategory.map((item,index)=>{
                    return <Link key={index} to={"/shop/"+mc+"/"+item.name+"/"+br} className="list-group-item list-group-item-action">{item.name}</Link>
                })}
            </div>
            <div className="list-group">
            <p className="background text-light p-2 mb-2">Brand</p>
                <Link to={"/shop/"+mc+"/"+sc+"/All"} className="list-group-item list-group-item-action">All</Link>
                {brand.map((item,index)=>{
                    return <Link key={index} to={"/shop/"+mc+"/"+sc+"/"+item.name} className="list-group-item list-group-item-action">{item.name}</Link>
                })}

            </div>
            
          </div>
          <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
          {q=="" ?<ProductList mc={mc} sc={sc} br={br} q="None"/>: <ProductList mc={mc} sc={sc} br={br} q={q}/> }
          </div>
        </div>
      </div>

    </>
  )

} 
