import React, {createContext,useState} from "react";
import pic1 from '../Asserts/Products/p1.jpg'
import pic2 from '../Asserts/Products/p2.jpg'
import pic3 from '../Asserts/Products/p3.jpg'
import pic4 from '../Asserts/Products/p4.jpg'
import pic5 from '../Asserts/Products/p5.jpg'
import pic6 from '../Asserts/Products/p6.jpg'
import pic7 from '../Asserts/Products/p7.jpg'
import pic8 from '../Asserts/Products/p8.jpg'
import pic9 from '../Asserts/Products/p9.jpg'
import pic10 from '../Asserts/Products/p10.jpg'
import pic11 from '../Asserts/Products/p11.jpg'
import pic12 from '../Asserts/Products/p12.jpg'
import pic13 from '../Asserts/Products/p13.jpg'
import pic14 from '../Asserts/Products/p14.jpg'
import pic15 from '../Asserts/Products/p15.jpg'
import pic16 from '../Asserts/Products/p16.jpg'
import pic17 from '../Asserts/Products/p17.jpg'
import pic18 from '../Asserts/Products/p18.jpg'
import pic19 from '../Asserts/Products/p19.jpg'
import pic20 from '../Asserts/Products/p20.jpg'
import pic21 from '../Asserts/Products/p21.jpg'
import pic22 from '../Asserts/Products/p22.jpg'
import pic23 from '../Asserts/Products/p23.jpg'
import pic24 from '../Asserts/Products/p24.jpg'
import pic25 from '../Asserts/Products/p25.jpg'
import pic26 from '../Asserts/Products/p26.jpg'
import pic27 from '../Asserts/Products/p27.jpg'
import pic28 from '../Asserts/Products/p28.jpg'
import pic29 from '../Asserts/Products/p29.jpg'
import pic30 from '../Asserts/Products/p30.jpg'
import pic31 from '../Asserts/Products/p31.jpg'
import pic32 from '../Asserts/Products/p32.jpg'
import pic33 from '../Asserts/Products/p33.jpg'
import pic34 from '../Asserts/Products/p34.jpg'
import pic35 from '../Asserts/Products/p35.jpg'
import pic36 from '../Asserts/Products/p36.jpg'
import pic37 from '../Asserts/Products/p37.jpg'
import pic38 from '../Asserts/Products/p38.jpg'
import pic39 from '../Asserts/Products/p39.jpg'
import pic40 from '../Asserts/Products/p40.jpg'
import pic41 from '../Asserts/Products/p41.jpg'
import pic42 from '../Asserts/Products/p42.jpg'
import pic43 from '../Asserts/Products/p43.jpg'
import pic44 from '../Asserts/Products/p44.jpg'
import pic45 from '../Asserts/Products/p45.jpg'
import pic46 from '../Asserts/Products/p46.jpg'
import pic47 from '../Asserts/Products/p47.jpg'
import pic48 from '../Asserts/Products/p48.jpg'
import pic49 from '../Asserts/Products/p49.jpg'
import pic50 from '../Asserts/Products/p50.jpg'
import pic51 from '../Asserts/Products/p51.jpg'
import pic52 from '../Asserts/Products/p52.jpg'
import pic53 from '../Asserts/Products/p53.jpg'
import pic54 from '../Asserts/Products/p54.jpg'
import pic55 from '../Asserts/Products/p55.jpg'

export let ProductContext = createContext()
const ProductContextProvider = (props) => {
    const [products]=useState([
        {id:1,name:"Adidas Man Jeans slim Fit",maincategory:"Male", subcategory:"Jeans", brand:"Adidas",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:2,name:"Mufti Man Tshirt slim Fit",maincategory:"Male", subcategory:"Tshirt", brand:"Mufti",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic10,pic2:pic3,pic3:pic51,pic4:pic52},
        {id:3,name:"Tommy Hilfiger Man Jeans slim Fit",maincategory:"Male", subcategory:"Jeans", brand:"TommyHilfiger",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic25,pic2:pic26,pic3:pic7,pic4:{pic13}},
        {id:4,name:"Adidas Man Shirt slim Fit",maincategory:"Male", subcategory:"Shirt", brand:"Adidas",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic34,pic2:pic41,pic3:pic34,pic4:pic41},
        {id:5,name:"Polo Man Jeans slim Fit",maincategory:"Male", subcategory:"Jeans", brand:"Polo",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic11,pic2:pic16,pic3:pic44,pic4:pic26},
        {id:6,name:"Polo Woman Jeans slim Fit",maincategory:"Female", subcategory:"Jeans", brand:"Polo",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic12,pic2:pic17,pic3:pic19,pic4:pic22},
        {id:7,name:"Mufti Woman Jeans slim Fit",maincategory:"Female", subcategory:"Jeans", brand:"Mufti",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic47,pic2:pic53,pic3:pic32,pic4:pic55},
        {id:8,name:"Zara Woman Tshirt slim Fit",maincategory:"Female", subcategory:"Tshirt", brand:"Zara",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:9,name:"Zara Woman Shirt slim Fit",maincategory:"Female", subcategory:"Shirt", brand:"Zara",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:10,name:"Polo Woman Shirt slim Fit",maincategory:"Female", subcategory:"Shirt", brand:"Polo",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:11,name:"Polo Woman Jeans slim Fit",maincategory:"Female", subcategory:"Jeans", brand:"TommyHilfiger",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:12,name:"Nike Woman Jeans slim Fit",maincategory:"Female", subcategory:"Jeans", brand:"Nike",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:13,name:"Gucci Woman Tshirt slim Fit",maincategory:"Female", subcategory:"Tshirt", brand:"Gucci",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:14,name:"Adidas Woman Tshirt slim Fit",maincategory:"Female", subcategory:"Tshirt", brand:"Adidas",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:15,name:"Tommy hillfiger Woman Jeans slim Fit",maincategory:"Female", subcategory:"Jeans", brand:"TommyHilfiger",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:16,name:"Adidas Kids Jeans slim Fit",maincategory:"Kids", subcategory:"Tshirt", brand:"Adidas",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:17,name:"Mufti Kids Jeans slim Fit",maincategory:"Kids", subcategory:"Jeans", brand:"Mufti",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:18,name:"Mufti Kids Shirt slim Fit",maincategory:"Kids", subcategory:"Shirt", brand:"Mufti",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:19,name:"Adidas Kids Jeans slim Fit",maincategory:"Kids", subcategory:"Jeans", brand:"Adidas",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
        {id:20,name:"Tommyhillfiger Kids  slim Fit",maincategory:"Kids", subcategory:"Shirt", brand:"TommyHilfiger",baseprice:5000,discount:5,finalprice:2500,color:"blue",size:"XXL", description:"This is Sample Product",stock:"In Stock", pic1:pic1,pic2:pic2,pic3:pic5,pic4:pic7},
       ])
       return(
        <ProductContext.Provider value={{products:[...products]}}>
            {props.children}
        </ProductContext.Provider>

       )
}

export default ProductContextProvider