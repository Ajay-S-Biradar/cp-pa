import './App.css'
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'

const AppLayout = ()=>{
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const AppRouter = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<Home />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={AppRouter} />
  )
}

export default App
