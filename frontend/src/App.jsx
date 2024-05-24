import './App.css'
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TextPage from './pages/TextPage'
import NotFound from './pages/NotFound'
import ContactUs from './pages/ContactUs'

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
      },
      {
        path:"/use",
        element:"usage"
      },
      {
        path:'contactus',
        element:<ContactUs />
      }
    ]
  },
  {
    path:'notfound',
    element:[<Navbar />, <NotFound />]
  },
  {
    path:':id',
    element:[<Navbar />, <TextPage />]
  },
])

function App() {
  return (
    <RouterProvider router={AppRouter} />
  )
}

export default App
