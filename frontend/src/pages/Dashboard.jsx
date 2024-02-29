import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export default function Dashboard()
{
    function clickHandler()
    {
        localStorage.removeItem("token");
        navigate('/');
        toast.success('Logged out successfully');
    }
    const navigate = useNavigate();
    return(
        <div className="w-full flex flex-col justify-center items-center gap-y-5">
           <h1 className="text-white text-3xl font-bold">Welcome to Dashboard</h1>
           <button className="bg-black text-white py-2 px-5 rounded-md" onClick={clickHandler}>Log out</button>
        </div>
    )
}