import React from 'react'
import pic1 from '../Asserts/images/banner(1).jpg'
import pic2 from '../Asserts/images/banner(2).jpg'
import pic3 from '../Asserts/images/banner(3).jpg'
import pic4 from '../Asserts/images/banner(4).jpg'
import pic5 from '../Asserts/images/banner(5).jpg'
import pic6 from '../Asserts/images/banner(6).jpg'
import pic7 from '../Asserts/images/banner(7).jpg'
import pic8 from '../Asserts/images/banner(8).jpg'
import pic9 from '../Asserts/images/banner(9).jpg'
import pic10 from '../Asserts/images/banner(10).jpg'
import pic11 from '../Asserts/images/banner(11).jpg'
import pic12 from '../Asserts/images/banner(12).jpg'
import ProductList from './ProductList'
export default function Home() {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-label="Slide 8"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-label="Slide 9"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="9" aria-label="Slide 10"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="10" aria-label="Slide 11"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="11" aria-label="Slide 12"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="12" aria-label="Slide 13"></button>
                </div>
                <div className="carousel-inner mt-5">
                    <div className="carousel-item active">
                        <img src={pic1} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic2} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic3} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic4} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic5} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic6} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic7} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic8} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic9} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic10} className="d-block w-100" height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic11} className="d-block w-100"  height="500px" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic12} className="d-block w-100" height="500px" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            
            </div>
            <h4 className='text-center text-light bg-primary p-3'>Latest Product section</h4>
            <ProductList mc='All' sc="All" br="All" q="None"/> 
        </>
    )
}
