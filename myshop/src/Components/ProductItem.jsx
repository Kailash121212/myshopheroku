import React from 'react'
import {Link} from 'react-router-dom'
export default function ProductItem(props) {
    return (
        <>
            <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                <div className="card">
                    <img src={"/public/media/images/"+props.pic} height="150px" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title" style={{height:"83px"}}>{props.name}</h5>
                        <p className="card-text">&#8377; <del>{props.baseprice}</del> { props.finalprice}</p>
                        <p className="card-text"> Discount {props.discount}% </p>
                        <Link to={"/single-product-page/"+props.id } className="btn btn-primary background text-light text-center w-100">View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
