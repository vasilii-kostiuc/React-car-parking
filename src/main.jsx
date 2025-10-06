import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '@/App'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import EditProfile from '@/views/profile/EditProfile'
import '@/assets/main.css'
import { route } from '@/routes'
import VehiclesList from '@/views/vehicles/VehiclesList'
import CreateVehicle from '@/views/vehicles/CreateVehicle'
import EditVehicle from '@/views/vehicles/EditVehicle'
import axios from "axios";
import ActiveParkings from '@/views/parkings/ActiveParkings'

window.axios = axios;
 
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "https://localhost:7041/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={route("home")} element={<App />}>
          <Route index element={<Home />} />
          <Route path={route("register")} element={<Register />} />
          <Route path={route("login")} element={<Login />} />
          <Route path={route("vehicles.index")} element={<VehiclesList />} />
          <Route path={ route('parkings.active') } element={<ActiveParkings />} />
          <Route path={ route('profile.edit') } element={<EditProfile />} />
          <Route path={ route('vehicles.create') } element={<CreateVehicle />} />
           <Route path={ route('vehicles.edit') } element={<EditVehicle />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);