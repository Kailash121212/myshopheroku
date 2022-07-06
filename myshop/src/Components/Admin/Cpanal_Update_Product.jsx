import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cpanal_LeftNav from './Cpanal_LeftNav'
export default function Cpanel_Update_Product() {
    var navigate = useNavigate()
    var { _id } = useParams()
    var [product, setproduct] = useState({
        name: "",
        maincategory: "Male",
        subcategory: "Jeans",
        brand: "Adidas",
        stock: "In Stock",
        baseprice: "",
        discount: "",
        finalprice: "",
        color: "",
        size: "",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
        description: "This is Sample Product"
    })
    var [maincategory, setmaincategory] = useState([])
    var [subcategory, setsubcategory] = useState([])
    var [brand, setbrand] = useState([])

    useMemo(async () => {
        var rawdata = await fetch("/maincategory",{
             headers:{
      authorization:localStorage.getItem("token"),
      username:localStorage.getItem("username")

      }
        })
        var result = await rawdata.json()
        setmaincategory(result)

        var rawdata = await fetch("/subcategory",{
             headers:{
      authorization:localStorage.getItem("token"),
      username:localStorage.getItem("username")

      }
        })
        var result = await rawdata.json()
        setsubcategory(result)

        var rawdata = await fetch("/brand",{
        headers:{
        authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

        }
        })
        var result = await rawdata.json()
        setbrand(result)

        var rawdata = await fetch("/product/" + _id,{
             headers:{
      authorization:localStorage.getItem("token"),
      username:localStorage.getItem("username")

      }
        })

        var result = await rawdata.json()
        if (!(result.message)) {
            setproduct(result)
        }

    }, [])
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setproduct((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0]
        setproduct((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var bp = parseInt(product.baseprice)
        var d = parseInt(product.discount)
        var fp = bp - bp * d / 100
        var formData = new FormData()
        formData.append("name", product.name)
        formData.append("maincategory", product.maincategory)
        formData.append("subcategory", product.subcategory)
        formData.append("brand", product.brand)
        formData.append("stock", product.stock)
        formData.append("baseprice", bp)
        formData.append("finalprice", fp)
        formData.append("discount", d)
        formData.append("color", product.color)
        formData.append("size", product.size)
        formData.append("description", product.description)
        formData.append("pic1", product.pic1)
        formData.append("pic2", product.pic2)
        formData.append("pic3", product.pic3)
        formData.append("pic4", product.pic4)
        var rawdata = await fetch("/product/"+_id, {
            method: "put",
            headers:{
                authorization:localStorage.getItem("token"),
        username:localStorage.getItem("username")

                },
            body: formData
        })
        var result = await rawdata.json()
        if (result.message == "Done")
            navigate("/admin-product")
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
                        <h5 className='background text-light text-center p-2'>Product</h5>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" onChange={getData} className="form-control" name="name" placeholder='Enter Main Category Name' value={product.name} />
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-3 col-sm-6 col-12'>
                                    <label className="form-label">Main-Category</label>
                                    <select name='maincategory' className='form-control' >
                                        {
                                            maincategory.map((item,index) => {
                                                return  <option key={index}  value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12'>
                                    <label className="form-label">Sub-Category</label>
                                    <select name='subcategory' className='form-control' >
                                        {
                                            subcategory.map((item,index) => {
                                                return  <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12'>
                                    <label className="form-label">Brand</label>
                                    <select name='brand' className='form-control' >
                                        {
                                            brand.map((item,index) => {
                                                return  <option key={index}  value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12'>
                                    <label className="form-label">Stock</label>
                                    <select name='stock' className='form-control'>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out Of Stock">Out Of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Base Price</label>
                                    <input type="number" onChange={getData} className="form-control" name="baseprice" placeholder='Enter Base Price of Product' value={product.baseprice} />
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Discount</label>
                                    <input type="number" onChange={getData} className="form-control" name="discount" min="0" max="100" placeholder='Enter Discount Of Product' value={product.discount} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Color</label>
                                    <input type="text" onChange={getData} className="form-control" name="color" placeholder='Enter Color of Product' value={product.color}/>
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Size</label>
                                    <input type="text" onChange={getData} className="form-control" name="size" placeholder='Enter Size of Product' value={product.size}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea name='description' className='form-control' defaultValue={product.description}></textarea>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Pic1</label>
                                    <input type="file" onChange={getFile} className="form-control" name="pic1"/>
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Pic2</label>
                                    <input type="file" onChange={getFile} className="form-control" name="pic2" />
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Pic3</label>
                                    <input type="file" onChange={getFile} className="form-control" name="pic3" />
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <label className="form-label">Pic4</label>
                                    <input type="file" onChange={getFile} className="form-control" name="pic4" />
                                </div>
                            </div>
                            <button type="submit" onClick={postData} className="btn background text-light w-100">Update</button>
                        </form>
                    </div>
                </div>
        </>
    )
}
