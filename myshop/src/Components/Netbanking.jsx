import React,{useEffect,useState} from 'react'
import useRazorpay from "react-razorpay";
import { useNavigate,useParams } from 'react-router-dom';
export default function Netbanking() {
    const Razorpay= useRazorpay()
    var [checkout, setcheckout]=useState({})
    var navigate= useNavigate()
    var{_id}= useParams()
    
    async function getData() {
		var rawdata = await fetch("/checkout/"+localStorage.getItem("userid"),{
			authorization:localStorage.getItem("token"),
			username:localStorage.getItem("username")


		})
		var result = await rawdata.json()
		if(_id=="-1")
		result = result[result.length - 1]
		else
		result = result.find((item)=>item._id==_id)
		
		setcheckout(result)
	}

	useEffect(()=>{
		getData()
	},[])
	
	const initPayment =  (data) => {
		const options = {
			key: "rzp_test_Rk7W06o24Qt88u",
			amount: data.amount,
			currency: "INR",
			order_id: data._id,
			handler: async (response) => {
				try {
					var item = {
						razorpay_order_id:response.razorpay_order_id,
						razorpay_payment_id:response.razorpay_payment_id,
						razorpay_signature:response.razorpay_signature,
						checkid:checkout._id
					}
					const verifyUrl = "/verify";
					var rawdata = await fetch(verifyUrl, {
						method: "put",
						headers: {
							"Content-Type": "application/json",
							authorization:localStorage.getItem("token"),
							username:localStorage.getItem("username")

						},
						body: JSON.stringify(item)
					});
					var data = await rawdata.json()
					if(data.message=="Done")
						navigate("/confirmation")
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "/orders";
			const rawdata = await fetch(orderUrl, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					authorization:localStorage.getItem("token"),
					username:localStorage.getItem("username")

				},
				body: JSON.stringify({ amount: checkout.final})
			});
			var data=await rawdata.json()
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};


  return (
    <>
      <div className='container-fluid mt-5'>
        <button onClick={handlePayment} className="btn bg-primary w-100 text-light mb-2">Buy Now</button>
      </div>
    </>
  )
}
