import { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ResetPassword()
{
    const[formData,setFormData] = useState({
        password:''
    });
    const{id,token} = useParams();

    const API_URL = 'https://mern-auth-app-arc0.onrender.com/api/v1';
    const navigate = useNavigate();

    async function reset()
    {
        try{
            const response = await fetch(`${API_URL}/reset-password/${id}/${token}`,{
                method:'PUT',
                headers:{
                    'Content-type':'Application/JSON'
                },
                body:JSON.stringify(formData)
            })

            const result = await response.json();

            if(result.success)
            {
                toast.success('Your password has been changed successfully');
                navigate('/');
            }

            else{
                toast.error('Something went wrong');
            }

            console.log(result);
        }catch(err){
            console.log(err);
        }
    }

   function handleSubmit(e)
   {
    e.preventDefault();
    reset();
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
         <h1 className="text-center text-2xl font-bold">Reset Password</h1>

         <div className="w-full mt-5">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-y-1">
                    <label htmlFor="email" className="text-lg">Enter new password</label>
                    <input type='password' name='password' placeholder="Enter your password" className="border-2 py-2 px-4 rounded-md" autoComplete="off" onChange={handleChange} value={formData.password}></input>
              </div>

              <div className="text-center mt-7 w-full">
                <button className="bg-black text-white w-full py-2 px-4 rounded-md">Reset Password</button>
              </div>

            </form>
         </div>
      </div>
     </div>
    )
}