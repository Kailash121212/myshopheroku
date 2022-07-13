import React from 'react'
import pic1 from "../Asserts/Products/a (1).jpg"
import pic2 from "../Asserts/Products/a (2).jpg"
import pic3 from "../Asserts/Products/a (3).jpg"
import pic4 from "../Asserts/Products/a (4).jpg"
import pic5 from "../Asserts/Products/a5.jpg"
export default function About() {
    return (
        <>
            <div classNameName='container-fluid mb-2'>
                <div className="accordion accordion-flush mt-5 mb-2" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Introduction
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Online shopping is the better way of buying several items of your own choice at one place and get it delivered wherever you do live itself. Therefore we can define online shopping as one of the convenient and interesting ways of shopping. It reduces market crowd and saves our money and time.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed text-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Online shopping in simple words:
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">The form of shopping in which people can easily purchase goods and services by using the internet is called online shopping. Online shopping gives us an idea of the availability of everything online at a cost of our data. Online shopping is a growing and trending aspect. It provides customers with buying various products and services, and sellers to carry on their business and transactions in an online mode. It is time saving and convenient way of shopping. It can be said that it is the development of traditional shopping ways to make shopping more accessible, relaxing, and flexible.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed text-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Challenges of Online Shopping
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Instead of providing best ways to make choices without getting out of our comfort zone, online shopping has many negative aspects too.

                                1 It requires a good knowledge of using smart technologies as well as net surfing.
                                2 There are many sections of society that do not have easy access to the same and thus are dependent on traditional ways of shopping.
                                3 Old people need to specify the products after touching thus they prefer traditional shopping and have not much confidence in online shopping.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed text-danger" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Conclusion
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Online shopping has turned out to be an essential need of the time. Because, nowadays in the so competitive world, people are busy in their offices and do not have time to shop. And this technology is making their life easier and fast.</div>
                        </div>
                    </div>
                </div>


                <div className="d-flex container-fluid m-2 border">
                    <img src={pic1} width="300px" height="300px" style={{ borderRadius: "20px", marginTop: "20px" }} alt="..." />
                    <div className="card-body">
                        <h5>Pleasure of Online Shopping</h5>
                        <p className="card-text">
                            We are well aware of this fact that most of the people find shopping as an interesting aspect. Generally, women and girls are addicted to shopping.
                            Now, since technology is advancing day by day and letting newer ways to develop, we have been benefitted by a way of shopping by sitting at our places
                            and browsing over the internet. We are able to get various range of products in a single place. Also, we can search for the product related to men, women,
                            and kids by entering the categories in the spaces meant for the same. We search, select, and order for the products and services and get it delivered to our places.
                            This is helping the people in remote areas too. We could search and order for the latest apparel through online mode. Generally, the shops are taking the time
                            to bring and present the same.
                            The most preferred online shopping sites are Snapdeal, Flipkart, Amazon, Myntra, Ajio, etc.</p>
                    </div>
                </div>


                <div className="d-flex container-fluid m-2 flex-row-reverse border">
                    <img src={pic2} width="300px" height="300px" style={{ borderRadius: "20px", marginTop: "20px" }} alt="..." />
                    <div className="card-body">
                        <h5>Advantages of Online Shopping:</h5>
                        <ul>
                            <li>It provides us with a convenient way of shopping.</li>
                            <li>We can see different products and services just by one click. Different variants are available in the required size and shapes.</li>
                            <li>It saves us from the rush and crowd of the markets. Also, saves our time wasted in roaming from one shop to another and standing in queues for hours for billing purposes.</li>
                            <li>We get products in our price ranges and also at a lower price.</li>
                            <li>We can order dresses according to our choice and occasion requirements. As most of the time, we are unable to get the dress we want, in offline shopping.</li>
                        </ul>
                    </div>
                </div>


                <div className="d-flex container-fluid m-2 border">
                    <img src={pic3} width="300px" height="300px" style={{ borderRadius: "20px", marginTop: "20px" }} alt="..." />
                    <div className="card-body">
                        <h5>Online Shopping - Best Option during Pandemic (Covid-19)</h5>
                        <p className="card-text">The outbreak of COVID-19, throughout the world was most devastating for us. During those times, moving outside was banned and different countries were under lockdown for several months. People, all over the world, preferred online mediums to get their products and services ordered and delivered.
                            Therefore it can be stated that online shopping has been the best choice or alternative. People have been provided with the option of getting delivered every product at their doorstep.</p>
                    </div>
                </div>


                <div className="d-flex container-fluid m-2 flex-row-reverse border">
                    <img src={pic4} width="300px" height="300px" style={{ borderRadius: "20px", marginTop: "20px" }} alt="..." />
                    <div className="card-body">
                        <h5>Online Shopping is a Boon</h5>
                        <p className="card-text">For many people, online shopping is a boon as it offers many advantages. It not only saves your time but also helps to save your money and energy. Instead of spending a whole day in the market, you can buy things by sitting at your home. The prices of products in online shops are comparatively lower than those available offline. One reason behind this is that there is no need of maintaining any physical stores. It also offers different methods of payment. During festive times, online shopping offers discounts on various products. Online shopping is a convenient way of shopping these days.</p>
                        <h5>Online Shopping is a Bane</h5>
                        <p className="card-text">Everything has a dark side and so is online shopping. The major drawback of shopping online is to compromise with quality. Sometimes you may receive the wrong product and returning can be a headache. You can only check the quality when you receive the product. Even on ordering your product you can get it delivered after some days. No instant service is available in online shopping methods. When doing online shopping, you will miss out on the joy of shopping with your friends or family. Precautions are a must in Online paying, as it involves several risks.</p>
                    </div>
                </div>


                <div className="d-flex container-fluid m-2 border">
                    <img src={pic5} width="300px" height="300px" style={{ borderRadius: "20px", marginTop: "20px" }} alt="..." />
                    <div className="card-body">
                        <h5>Online Shopping</h5>
                        <ol>
                            <li> Shopping by making use of the internet is called online shopping.</li>
                            <li>Online shopping allows us to shop for anything from our phones.</li>
                            <li>With online shopping, the days are gone to go to physical markets to buy things.</li>
                            <li>People, who don’t know how to use smartphones, cannot do online shopping.</li>
                            <li>Through online shopping, you can order your favorite things at your doorstep.</li>
                            <li>In online shopping, you can compare the prices of products and can buy the cheaper ones.</li>
                            <li>Alibaba, Amazon, Flipkart, eBay, etc are some famous sites for online shopping.</li>
                            <li>While doing online shopping, you can only see the products virtually.</li>
                            <li> Online shopping does not provide you with the product instantly.</li>
                            <li>Online shopping is a modern and flexible way of buying goods.</li>
                        </ol>
                    </div>
                </div>

            </div>
        </>
    )
}
