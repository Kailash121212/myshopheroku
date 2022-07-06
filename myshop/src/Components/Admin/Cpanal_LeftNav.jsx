import React from 'react'
import {Link} from "react-router-dom"
export default function Cpanal_LeftNav() {
    return (
        <>
           
            <div className="list-group">
                <Link to="/admin" className="list-group-item background text-light m-1 mt-b-1">Profile</Link>
                <Link to="/admin-user" className="list-group-item background text-light m-1 mt-b-1">User</Link>
                <Link to="/admin-maincategory" className="list-group-item background text-light m-1 mt-b-1">Main-Category</Link>
                <Link to="/admin-subcategory" className="list-group-item background text-light m-1 mt-b-1">Sub-Category</Link>
                <Link to="/admin-brand" className="list-group-item background text-light m-1 mt-b-1">Brand</Link>
                <Link to="/admin-product" className="list-group-item background text-light m-1 mt-b-1">Product</Link>
                <Link to="/admin-checkout" className="list-group-item background text-light m-1 mt-b-1">Checkouts</Link>
                <Link to="/admin-contactus" className="list-group-item background text-light m-1 mt-b-1">Contact Us</Link>
                <Link to="/admin-newslatters" className="list-group-item background text-light m-1 mt-b-1">NewsLatters</Link>
            </div>
        </>
    )
}
