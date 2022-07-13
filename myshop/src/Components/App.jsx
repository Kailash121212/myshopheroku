import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './footer'
import Home from './Home'
import Shop from './shop'
import Profile from "./Profile"
import Login from './Login'
import Cart from './Cart'
import Signup from './Signup'
import Contact from './Contact'
import Update_Profile from './UpdateProfile'

import SingleProductPage from './singleProductPage'
import Cpanal_index from './Admin/Cpanal_index'
import Cpanal_Maincategory from './Admin/Cpanal_Maincategory'
import Cpanal_Add_Maincategory from './Admin/Cpanal_Add_Maincategory'
import Cpanal_Update_Maincategory from './Admin/Cpanal_Update_Maincategory'
import Cpanal_User from './Admin/Cpanal_User'
import Cpanal_NewsLatters from './Admin/Cpanal_NewsLatters'
import Cpanal_Contact from './Admin/Cpanal_Contact'
import Cpanal_Subcategory from './Admin/Cpanal_Subcategory'
import Cpanal_Add_Subcategory from './Admin/Cpanal_Add_Subcategory'
import Cpanal_Update_Subcategory from './Admin/Cpanal_Update_Subcategory'
import Cpanal_Brand from './Admin/Cpanal_Brand'
import Cpanal_Add_Brand from './Admin/Cpanal_Add_Brand'
import Cpanal_Update_Brand from './Admin/Cpanal_Update_Brand'
import Cpanal_Product from './Admin/Cpanal_Product'
import Cpanal_Add_Product from './Admin/Cpanal_Add_Product'
import Cpanal_Update_Product from './Admin/Cpanal_Update_Product'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Cpanal_Checkout from './Admin/Cpanal_Checkout'
import Cpanal_Single_Checkout from './Admin/Cpanal_Single_Checkout'
import Netbanking from './Netbanking'
import Cpanal_Single_Contact from './Admin/Cpanal_Single_Contact'
import Error from "./Error"
import Forget_Password_Username from './Forget_Password_Username'
import Forget_Password_OTP from './Forget_Password_OTP'
import Forget_Password_Reset from './Forget_Password_Reset'
import About from './About'


export default function App() {
  return (
      <>
      
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/shop/:mc/:sc/:br/:q' element={<Shop/>}/>
              <Route path='/single-product-page/:_id' element={<SingleProductPage/>}/>
              <Route path='/cart' element={localStorage.getItem("role")=="Admin"? <Cpanal_index/>:<Cart/>}/>
              <Route path='/profile' element={localStorage.getItem("role")=="Admin"? <Cpanal_index/>:<Profile/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/update-profile' element={localStorage.getItem("role")=="Admin"? <Cpanal_index/>:<Update_Profile/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/forget-password-username' element={<Forget_Password_Username/>}/>
              <Route path='/forget-password-OTP' element={<Forget_Password_OTP/>}/>
              <Route path='/forget-password-reset' element={<Forget_Password_Reset/>}/>

              <Route path='/admin' element={localStorage.getItem("role")=="Admin"? <Cpanal_index/>:<Profile/>}/>
              <Route path='/admin-maincategory' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Maincategory/>:<Profile/>}/>
              <Route path='/admin-add-maincategory' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Add_Maincategory/>:<Profile/>}/>
              <Route path='/admin-update-maincategory/:_id' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Update_Maincategory/>:<Profile/>}/>
              <Route path='/admin-subcategory' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Subcategory/>:<Profile/>}/>
              <Route path='/admin-add-subcategory' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Add_Subcategory/>:<Profile/>}/>
              <Route path='/admin-update-subcategory/:_id' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Update_Subcategory/> :<Profile/>}/>
              <Route path='/admin-brand' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Brand/>:<Profile/>}/>
              <Route path='/admin-add-brand' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Add_Brand/>:<Profile/>}/>
              <Route path='/admin-update-brand/:_id' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Update_Brand/>:<Profile/>}/>
              <Route path='/admin-product' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Product/>:<Profile/>}/>
              <Route path='/admin-add-product' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Add_Product/>:<Profile/>}/>
              <Route path='/admin-update-product/:_id' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Update_Product/>:<Profile/>}/>
              <Route path='/admin-user' element={ localStorage.getItem("role")=="Admin"? <Cpanal_User/>:<Profile/>}/>
              <Route path='/admin-newslatters' element={ localStorage.getItem("role")=="Admin"? <Cpanal_NewsLatters/>:<Profile/>}/>
              <Route path='/admin-contactus' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Contact/>:<Profile/>}/>
              <Route path='/admin-single-contact/:_id' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Single_Contact/>:<Profile/>}/>
              <Route path='/admin-checkout' element={ localStorage.getItem("role")=="Admin"? <Cpanal_Checkout/>:<Profile/>}/>
              <Route path='/checkout' element={localStorage.getItem("role")=="Admin"? <Cpanal_index/>:<Checkout/>}/>
              <Route path='/confirmation' element={<Confirmation/>}/>
              <Route path='/admin-single-checkout/:_id' element={localStorage.getItem("role")=="Admin"? <Cpanal_Single_Checkout/> :<Profile/>}/>
              <Route path="/netbanking/:_id" element={<Netbanking/>}></Route>
             
             <Route path='*' element={<Error/>} />
             </Routes>
          </BrowserRouter>
          <Footer/>
       
    </>
  )
}
