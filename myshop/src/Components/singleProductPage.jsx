import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function SingleProductPage() {
    var { _id } = useParams()
    var [product, setproduct] = useState({})
    var navigate = useNavigate()
    useMemo(async () => {
        var rawdata = await fetch("/product/"+_id)
        var result = await rawdata.json()
        if (!(result.message)) {
            setproduct(result)
        }
    },[])

    async function addtocart() {
        var rawdata = await fetch("/cart/"+localStorage.getItem("userid"),{
            headers:{
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

            }
        })
        var result= await rawdata.json()
        var flag= false
        for(let item of result){
            if(item.productid == _id){
                flag= true
                break;
            }
        }
        if(flag==false){
        var item = {
            userid: localStorage.getItem("userid"),
            productid: _id,
            name: product.name,
            color: product.color,
            size: product.size,
            pic: product.pic1,
            price: product.finalprice,
            qty: 1,
            total: product.finalprice,

        }
         rawdata = await fetch("/cart", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

            },
            body: JSON.stringify(item)
        })
       result = await rawdata.json()
        if (result.message == "Done")
            navigate("/cart")
        else
            alert(result.message)
    }
    navigate("/cart")
}

    async function addtowishlist() {
        var rawdata = await fetch("/wishlist/"+localStorage.getItem("userid"),{
            headers:{
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

            }
        })
        var result= await rawdata.json()
        var flag= false
        for(let item of result){
            if(item.productid== _id){
                flag= true
                break;
            }
        }
        if(flag==false){
                var item = {
                    userid: localStorage.getItem("userid"),
                    productid: _id,
                    name: product.name,
                    color: product.color,
                    size: product.size,
                    pic: product.pic1,
                    price: product.finalprice,
        
                }
                var rawdata = await fetch("/wishlist", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

                    },
                    body: JSON.stringify(item)
                })
                var result = await rawdata.json()
                if (result.message === "Done")
                    navigate("/profile")
                else
                    alert(result.message)
            }
            navigate("/profile")
        }

    return (
        <>
            <h5 className='background text-light text-center w-100 p-3 mt-5'>Single Product Section</h5>
            <div className='container-fluid'>
                <div className='row mt-1'>
                    <div className='col-md-6 col-sm-12 col-12'>
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={"/public/media/images/" + product.pic1} className="d-block w-100" height="500px" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={"/public/media/images/" + product.pic2} className="d-block w-100" height="500px" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={"/public/media/images/" + product.pic3} className="d-block w-100" height="500px" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={"/public/media/images/" + product.pic4} className="d-block w-100" height="500px" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className=' mt-1 d-flex justify-content-between'>
                            <img src={"/public/media/images/" + product.pic4} width="24%" height="200px" alt="..."></img>
                            <img src={"/public/media/images/" + product.pic1} width="24%" height="200px" alt="..."></img>
                            <img src={"/public/media/images/" + product.pic2} width="24%" height="200px" alt="..."></img>
                            <img src={"/public/media/images/" + product.pic3} width="24%" height="200px" alt="..."></img>
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12 col-12' >
                        <h5 className='background text-center text-light p-2'>Single Page</h5>
                        <table className='table table-light table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <th>Main-category</th>
                                    <td>{product.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Sub-Category</th>
                                    <td>{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Base Price</th>
                                    <td>&#8377; <del>{product.baseprice}</del></td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{product.discount}%</td>
                                </tr>
                                <tr>
                                    <th>Finalprice</th>
                                    <td> &#8377; {product.finalprice}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>{product.color}</td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>{product.size}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{product.description}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} ><button className='btn background text-center text-light w-100' onClick={addtocart}>Add To Cart</button></th>
                                 </tr>  
                                 <tr>
                                    <th colSpan={2}><button className='btn background text-light w-100' onClick={addtowishlist}>Add To Wishlist</button></th>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
