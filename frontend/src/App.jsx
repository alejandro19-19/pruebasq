import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/homePage/HomePage"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import Rooms from "./pages/rooms/Rooms"
import Profile from "./pages/profile/Profile"
import FaceRegister from "./pages/faceRegister/FaceRegister"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="faceRegister" element={<FaceRegister />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
