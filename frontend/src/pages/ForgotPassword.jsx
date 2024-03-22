import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ForgotPassword()
{
    const[formData,setFormData] = useState({
        email:''
    });

    const API_URL = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();

    async function forgot()
    {
        try{
            const response = await fetch(`${API_URL}/forgot-password`,{
                method:'POST',
                headers:{
                    'Content-type':'Application/JSON'
                },
                body:JSON.stringify(formData)
            })

            const result = await response.json();

            if(result.success)
            {
                toast.success('Link sent successfully');
                navigate('/');
            }

            else{
                toast.error('Incorrect email or password');
            }

            console.log(result);
        }catch(err){
            console.log(err);
        }
    }

   function handleSubmit(e)
   {
    e.preventDefault();
    forgot();
   }

   function handleChange(e) {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
}
    return(
        <div className="w-full flex justify-center items-center flex-col">
         <div className="max-w-[500px] bg-white text-black w-11/12 py-4 px-4 mt-8 rounded-md shadow-lg">
         <h1 className="text-center text-2xl font-bold">Forgot Password</h1>

         <div className="w-full mt-5">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-y-1">
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input type='text' name='email' placeholder="Enter your email" className="border-2 py-2 px-4 rounded-md" autoComplete="off" onChange={handleChange} value={formData.email}></input>
              </div>

              <div className="text-center mt-7 w-full">
                <button className="bg-black text-white w-full py-2 px-4 rounded-md">Send Mail</button>
              </div>

            </form>
         </div>
      </div>
     </div>
    )
}