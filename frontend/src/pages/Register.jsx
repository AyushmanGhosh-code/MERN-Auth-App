import { useNavigate } from "react-router-dom"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import toast from 'react-hot-toast'

export default function Register()
{
    const API_URL = 'https://mern-auth-app-arc0.onrender.com/api/v1';
    const navigate = useNavigate();
    const[showPassword,setShowPassword] = useState(false);
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    function handleChange(event)
    {
        const{name,value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:value
        }))
    }

    async function createData(){
        try{
           const response = await fetch(`${API_URL}/register`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },

            body:JSON.stringify(formData)
           })

           const data = await response.json();
           console.log(data);

           if(data.success)
           {
             navigate('/');
             toast.success('Registered successfully');
           }

           else{
            toast.error('User already registered');
           }
        }catch(err){
            console.log('Registration Issue');
            console.error(err);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        createData();
    }

    return(
       <div className="w-full flex flex-col justify-center items-center">
       <h1 className="font-bold text-3xl text-white">MERN <span className="font-normal">Auth App</span></h1>
       
        <p className="text-white mt-2">Built with React, NodeJs, Express, MongoDB, JWT and Tailwind.</p>
         <div className="max-w-[500px] bg-white text-black w-11/12 py-4 px-4 mt-8 rounded-md shadow-lg">
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <p className="text-center mt-2">Already have an account? <span className="font-bold text-blue-400 cursor-pointer" onClick={() => navigate('/')}>Login</span></p>

        <div className="w-full mt-5">
           <form className="w-full" onSubmit={handleSubmit}>
             <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="name" className="text-lg">Name</label>
               <input type='text' name='name' placeholder="Enter your name" className="border-2 py-2 px-4 rounded-md" value={formData.name} onChange={handleChange} required autoComplete="off"></input>
             </div>

             <div className="w-full flex flex-col gap-y-1 mt-3">
                <label htmlFor="email" className="text-lg">Email</label>
               <input type='text' name='email' placeholder="Enter your email" className="border-2 py-2 px-4 rounded-md" value={formData.email} onChange={handleChange} required autoComplete="off"></input>
             </div>

             <div className="w-full flex flex-col mt-3 gap-y-1">
                <label htmlFor="password" className="text-lg">Password</label>
                <div className="w-full relative">
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="Enter your password" className="border-2 py-2 px-4 rounded-md w-full" value={formData.password} onChange={handleChange} required autoComplete="off"></input>
                    <div className="absolute top-[10px] right-[10px] text-[25px]" onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword ? (<IoIosEye/>) : (<IoIosEyeOff/>)
                    }
                    </div>
                </div>
             </div>

             <div className="mt-5">
               <button type="submit" className="bg-black text-white py-2 px-4 w-full rounded-md">Register</button>
             </div>
           </form>
        </div>
     </div>
       </div>
    )
}
