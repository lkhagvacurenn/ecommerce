import { Routes, Route} from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Profile  from "./pages/Profile"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import About from "./pages/About"

function App() {

  return (
    <div className="max-w-7xl w-full  mx-auto px-5 min-h-screen flex flex-col text-secondaryClr ">
    <Header/>
    <Routes>
      <Route index element = {<Home/>}></Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
