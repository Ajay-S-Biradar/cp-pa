import './App.css'

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"



const AppRouter = createBrowserRouter([
  {
    path:'/',
    element:<h1>hii all</h1>
  }
])

function App() {
  return (
    <RouterProvider router={AppRouter} />
  )
}

export default App
