import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Search() {
    var navigate= useNavigate()
    var [q, setq] = useState([])
    var [data, setdata] = useState([])

    async function getData(e) {
        setq(e.target.value)
        var item={
            q:q
        }
        var rawdata = await fetch("/Search",{
            method:"post",
            header:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(item)
        })
        var result= await rawdata.json()
        navigate(`/shop/All/All/All/${e.target.value}`)
    }
    useEffect(() => {
        getData()
    }, [q])
    return (
        <>
            <form className="d-flex w-100">
                <input className="form-control me-2" onChange={getData} type="search" name="search" placeholder="Search" aria-label="Search" />
            </form>
        </>
    )
}
