import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import './App.css'
import Home from './pages/Client/Home/Home'
import HomeAdmin from './pages/Admin/HomeAdmin/HomeAdmin'
import AdminMusicians from './pages/Admin/HomeAdmin/AdminMusicians'
import AdminMusicianEdit from './pages/Admin/HomeAdmin/AdminMusicianEdit';
import AdminCategories from './pages/Admin/HomeAdmin/AdminCategories'
import AdminRecordings from './pages/Admin/HomeAdmin/AdminRecordings'
import AdminTags from './pages/Admin/HomeAdmin/AdminTags'
import LoginAdmin from './pages/Admin/AuthAdmin/LoginAdmin'
import AdminLogout from './pages/Admin/AuthAdmin/AdminLogout'
import RegisterAdmin from './pages/Admin/AuthAdmin/RegisterAdmin'
import ResetAdmin from './pages/Admin/AuthAdmin/ResetAdmin'
import ForgotAdmin from './pages/Admin/AuthAdmin/ForgotAdmin'



function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='*' element={<NotFound />} /> */}

        <Route path='/admin/home' element={<HomeAdmin />} />
        <Route path='/admin/musicians' element={<AdminMusicians />} />
        <Route path='/admin/musician/' element={<AdminMusicianEdit />} />
        <Route path='/admin/musician/:musicianId' element={<AdminMusicianEdit />} />
        <Route path='/admin/categories' element={<AdminCategories />} />
        <Route path='/admin/recordings' element={<AdminRecordings />} />
        <Route path='/admin/tags' element={<AdminTags />} />   
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/logout' element={<AdminLogout />} />
        <Route path='/admin/register' element={<RegisterAdmin />} />        
        <Route path='/admin/forgot' element={<ForgotAdmin />} />
        <Route path='/admin/resetpassword/:resetToken' element={<ResetAdmin />} /> 
           
      </Routes>
    </>
  )
}

export default App
