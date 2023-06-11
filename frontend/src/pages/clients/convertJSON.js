const DATA = {
  clients: [
    {
      id_user: {
        id: 3,
        nombre: "Client2",
        apellido: "Client2",
        fecha_nacimiento: "2023-06-14",
        direccion: "calle 5 # 3-222",
        email: "client2@gmail.com",
      },
      habitacion_id: 1,
    },
    {
      id_user: {
        id: 4,
        nombre: "Client3",
        apellido: "Client3",
        fecha_nacimiento: "2023-06-14",
        direccion: "calle 5 # 3-222",
        email: "client3@gmail.com",
      },
      habitacion_id: 4,
    },
    {
      id_user: {
        id: 2,
        nombre: "Client1",
        apellido: "Client1",
        fecha_nacimiento: "2023-06-14",
        direccion: "calle 5 # 3-222",
        email: "client1@gmail.com",
      },
      habitacion_id: 5,
    },
    {
      id_user: {
        id: 5,
        nombre: "Client4",
        apellido: "Client4",
        fecha_nacimiento: "2023-06-23",
        direccion: "calle 5 # 3-222",
        email: "client4@gmail.com",
      },
      habitacion_id: null,
    },
  ],
};

export function convertJSON(data) {
  let newData = [];
  data.clients?.map((item) => {
    newData.push({
      id: item.id_user.id,
      nombre: item.id_user.nombre,
      apellido: item.id_user.apellido,
      fecha_nacimiento: item.id_user.fecha_nacimiento,
      direccion: item.id_user.direccion,
      email: item.id_user.email,
      habitacion_id: item.habitacion_id,
    });
  });
  return newData;
}
