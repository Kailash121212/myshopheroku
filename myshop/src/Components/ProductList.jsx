import React, { useState,useEffect, useMemo } from 'react'
import ProductItem from './ProductItem'
export default function ProductList(props) {
    var [products,setproducts]=useState([])
    useMemo(async()=>{
        if(props.q=="None"){
            var rawdata = await fetch("/product")
            var result = await rawdata.json()
            if (!(result.message)) {
                setproducts(result)
            }
        }
        else{
            var item={
                q:props.q
            }
            var rawdata = await fetch("/search",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(item)
            })
            var result = await rawdata.json()
                setproducts(result.data)
        }
    },[])
    var productList=[]
   if(props.q!="None")
   productList=products
    else if(props.mc==="All" && props.sc==="All" && props.br==="All")
        productList=products
    else if(props.mc!=="All" && props.sc==="All" && props.br==="All")
        productList = products.filter((item)=>item.maincategory===props.mc)
    else if(props.mc==="All" && props.sc!=="All" && props.br==="All")
        productList = products.filter((item)=>item.subcategory===props.sc)
    else if(props.mc==="All" && props.sc==="All" && props.br!=="All")
        productList = products.filter((item)=>item.brand===props.br)
    else if(props.mc!=="All" && props.sc!=="All" && props.br==="All")
        productList = products.filter((item)=>item.maincategory===props.mc && item.subcategory===props.sc)
    else if(props.mc!=="All" && props.sc==="All" && props.br!=="All")
        productList = products.filter((item)=>item.maincategory===props.mc && item.brand===props.br)        
    else if(props.mc==="All" && props.sc!=="All" && props.br!=="All")
        productList = products.filter((item)=>item.brand===props.br && item.subcategory===props.sc)
    else
        productList = products.filter((item)=>item.maincategory===props.mc && item.subcategory===props.sc && item.brand===props.br)
    
    productList.reverse()
    return(
    <>
        <div className='container-fluid'>
            <div className='row'>
                {
                    productList.map((item,index)=>{
                        return(
                            <ProductItem
                                key={index}
                                id = {item._id}
                                name = {item.name}
                                baseprice = {item.baseprice}
                                discount = {item.discount}
                                finalprice = {item.finalprice}
                                pic = {item.pic1}
                            />
                        )
                    })
                }
            </div>
        </div>
    </>  
  )
}
