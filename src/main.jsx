import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '@/App'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import '@/assets/main.css'
import { route } from '@/routes'
import VehiclesList from '@/views/vehicles/VehiclesList'
import axios from "axios";

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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);