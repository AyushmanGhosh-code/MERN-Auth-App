import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

export default function Login()
{
    const API_URL = 'https://mern-auth-app-arc0.onrender.com/api/v1';
    const navigate = useNavigate();
    const[showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        name:"",
        password:""
    })

    function handleChange(event)
    {
        const{name,value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }
    function handlePassword()
    {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          navigate('/dashboard');
      }
  }, [navigate]);

    async function login()
    {
        try{
          const response = await fetch(`${API_URL}/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },

            body:JSON.stringify(formData)
          })

          const data = await response.json();
          console.log(data);
  
          if(data.success)
          {
            navigate('/dashboard');
            localStorage.setItem("token", data.token);
            toast.success('Logged in successfully');       
          }

          else{
            toast.error('Invalid email or password');
          }
        }catch(err){
         console.log('Login Issue');
         console.error(err);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        login();
    }
    return(
     <div className="w-full flex justify-center items-center flex-col">
        <h1 className="font-bold text-3xl text-white">MERN <span className="font-normal">Auth App</span></h1>
        <p className="text-white mt-2">Built with React, NodeJs, Express, MongoDB, JWT and Tailwind.</p>
         <div className="max-w-[500px] bg-white text-black w-11/12 py-4 px-4 mt-8 rounded-md shadow-lg">
         <h1 className="text-center text-2xl font-bold">Login</h1>
         <p className="text-center mt-2">Don't have an account? <span className="font-bold text-blue-400 cursor-pointer" onClick={() => navigate('/register')}>Register</span></p>

         <div className="w-full mt-5">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-y-1">
                 <label htmlFor="email" className="text-lg">Email</label>
                <input type='text' name='email' placeholder="Enter your email" className="border-2 py-2 px-4 rounded-md" value={formData.email} onChange={handleChange} autoComplete="off"></input>
              </div>

              <div className="w-full flex flex-col mt-3 gap-y-1">
                 <label htmlFor="password" className="text-lg">Password</label>

                <div className="w-full relative">
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="Enter your password" className="border-2 py-2 px-4 rounded-md w-full" value={formData.password} onChange={handleChange} autoComplete="off"></input>
                    <div className="absolute top-[10px] right-[10px] text-[25px]" onClick={handlePassword}>
                    {
                        showPassword ? (<IoIosEye/>) : (<IoIosEyeOff/>)
                    }
                    </div>
                </div>

                <div className="mt-1">
                  <NavLink to='/forgot'>
                  <p className="text-[14px] text-blue-400 font-bold">
                       Forgot Password?
                  </p>
                  </NavLink>
                </div>
              </div>

              <div className="mt-5">
                <button className="bg-black text-white py-2 px-4 w-full rounded-md">Login</button>
              </div>
            </form>
         </div>
      </div>
     </div>
    )
}