import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/homePage/HomePage"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import Rooms from "./pages/rooms/Rooms"
import Profile from "./pages/profile/Profile"
import FaceRegister from "./pages/faceRegister/FaceRegister"
import Clients from "./pages/clients/Clients"
import RoomState from "./pages/roomState/RoomState"
import Reservations from "./pages/reservations/Reservations"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />}/>
          {/* <Route index element={<RoomState />}/> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="clientRegister" element={<FaceRegister userType={"Client"}/>} />
          <Route path="recepRegister" element={<FaceRegister userType={"Receptionist"}/>} />
          <Route path="clients" element={<Clients />} />
          <Route path="roomOccupied" element={<RoomState type={"occupied"} />} />
          <Route path="roomFree" element={<RoomState type={"free"} />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
