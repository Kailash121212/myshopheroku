import React from 'react'
import './myStyle.css'
import Search from './Search'
import { Link,useNavigate } from 'react-router-dom'
export default function Navbar() {
    var navigate= useNavigate()
    async function logout() {
        var item={
            token:localStorage.getItem("token"),
            username:localStorage.getItem("username")
        }
        var rawdata= await fetch("/logout",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(item)
        })
        var result= await rawdata.json()
        if(result.message=="Done"){
            localStorage.clear()
            navigate("/login")
        }
        else{
            alert(result.message)
        }
    }

    async function logoutALL() {
        var item={
            token:localStorage.getItem("token"),
            username:localStorage.getItem("username")
        }
        var rawdata= await fetch("/logoutall",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(item)
        })
        var result= await rawdata.json()
        if(result.message=="Done"){
            localStorage.clear()
            navigate("/login")
        }
        else{
            alert(result.message)
        }
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light background fixed-top ">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">MyCart</Link>
                    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="material-icons" style={{ width: "30px" }}>menu</i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="#">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/shop/All/All/All/None">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/contact">ContactUs</Link>
                            </li>
                        
                        <Search/>
                        
                                {localStorage.getItem("login") == "true"
                                 ?
                                        <li className="nav-item dropdown">
                                            <a className="nav-link text-light dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {localStorage.getItem("username")}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                              <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                                    
                                                    {localStorage.getItem("role")=="User" 
                                                    ? <li><a className="dropdown-item" href="/cart">Cart</a></li> :" " }
                                                    <hr />
                                                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                                    <li><button className="dropdown-item" onClick={logoutALL} title="logout from all devices">LogoutALL</button></li>
                                            </ul>
                                            </li>
                                                 :
                                                <Link className="nav-link text-light" to="/login">Login</Link>
                                        }
                            </ul>
                        
                    </div>
                </div>
            </nav>
            <br />
        </>
    )
}
