import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/Routers'
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div className="App">
       <RouterProvider router={router}></RouterProvider>
       <Toaster position="top-center" reverseOrder={false}></Toaster>
    </div>
  )
}

export default App
