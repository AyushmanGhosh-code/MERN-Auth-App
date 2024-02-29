import { Route,Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(109.6deg,_rgb(36,_45,_57)_11.2%,_rgb(16,_37,_60)_51.2%,_rgb(0,_0,_0)_98.6%)]">
       
       <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
       </Routes>
    </div>
  )
}

export default App
