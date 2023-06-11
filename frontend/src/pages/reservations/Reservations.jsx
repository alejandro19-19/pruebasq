import "./reservations.scss";
import Header from "../../components/header/Header";
import home_icon from "../../assets/home2.png";
import { Context } from "../../context/Context";
import { useState, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import img1 from "../../assets/img1.png";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
  const context = useContext(Context);
  const navigate = useNavigate("");
  const { data: dataUser, loading: loadingUser } = useFetch(
    `http://127.0.0.1:8000/core/${context.appState.typeUser}`,
    context.appState.token
  );
  const { data: dataRooms, loading: loadingRooms } = useFetch(
    `http://127.0.0.1:8000/core/rooms/free`,
    context.appState.token
  );

  async function assignRoom() {
    let room = generateRandomRoom(dataRooms);
    fetch("http://127.0.0.1:8000/core/rooms/assign", {
      method: "PUT",
      headers: {
        Authorization: context.appState.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id_user: dataUser.info_user.id_user.id,
        habitacion_id: room,
      }),
    });
  }
  function generateRandomRoom(data) {
    let rooms = [];
    data?.map((item) => {
      rooms.push(item.numero);
    });

    return rooms[Math.floor(Math.random() * rooms.length)];
  }

  return (
    <div className="Reservations">
      <div
        className="home_roomState"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home_icon} alt="home" />
      </div>
      <Header title={"Reservations"} subtitle={"Manage yuor information"} />
      {!loadingUser && !loadingRooms && (
        <div className="room">
          {console.log(dataUser)}
          {dataUser.info_user.habitacion_id != null ? (
            <>
              Tienes una habitación asignada
              {/* <button>Ver</button> */}
              <div className="card">
                <img src={img1} alt="image" />
                <p>{dataUser.info_user.habitacion_id}</p>
              </div>
            </>
          ) : (
            <>
              No tienes una habitación asignada
              <button
                onClick={() => {
                  assignRoom();
                }}
              >
                Deseo asignar una
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;
