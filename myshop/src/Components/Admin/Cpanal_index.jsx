import React from 'react'
import Cpanal_LeftNav from './Cpanal_LeftNav'
import pic from "../../Asserts/images/user.jpg"
export default function Cpanal_index() {
  return (
    <>
      <div className='row mt-5'>
        <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
          <h5 className='background text-light text-center p-2'>Menu</h5>
          <Cpanal_LeftNav/>
        </div>
        <div className='col-xxl-10 col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
        <h5 className='background text-light text-center p-2'>Admin Profile Section</h5>
          <div className='row'>
          <div className='col-md-6 col-sm-12 col-12'>
            <img src={pic} className="w-100" height="500px" ></img>
          </div>
          <div className='col-md-6 col-sm-12 col-12'>
            <div className='container-fluid'>
            <table className='table table-striped table-hover table-light'>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>Admin</td>
                </tr>
                <tr>
                  <th>User Name</th>
                  <td>Admin</td>
                </tr>
                 <tr>
                  <th>Email</th>
                  <td>Admin@gmail.com</td>
                </tr>
                 <tr>
                  <th>Phone</th>
                  <td>3456788654</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          </div>
        </div>

      </div>
    </>
  )
}
