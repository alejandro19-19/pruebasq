import { useTranslation } from "react-i18next";
import home_icon from "../../assets/home2.png";
import "./clients.scss";
import Header from "../../components/header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { convertJSON } from "./convertJSON";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const [t] = useTranslation("clients");
  const { data, loading } = useFetch("http://127.0.0.1:8000/core/client/all");
  const navigate = useNavigate("");
  // const data2 = [
  //   { id: 1, nombre: "Cliente1", apellido: "Cliente1", habitacion_id: true },
  //   { id: 2, nombre: "Cliente2", apellido: "Cliente2", habitacion_id: true },
  //   { id: 3, nombre: "Cliente3", apellido: "Cliente3", habitacion_id: false },
  //   { id: 4, nombre: "Cliente4", apellido: "Cliente1", habitacion_id: true },
  // ];

  let columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "nombre",
      headerName: `${t("name")}`,
      width: 200,
    },
    {
      field: "apellido",
      headerName: `${t("last_name")}`,
      width: 200,
    },
    {
      field: "habitacion_id",
      headerName: `${t("reservations")}`,
      width: 200,
      renderCell: (params) => {
        return (
          <div className={params.row.habitacion_id != null ? "green" : "red"}>
            {params.row.habitacion_id != null
              ? t("with_reservation")
              : t("without_reservation")}
          </div>
        );
      },
    },
    {
      field: "accion",
      headerName: `${t("action")}`,
      width: 100,
      renderCell: (params) => {
        return <button className="see">Ver</button>;
      },
    },
  ];

  return (
    <div className="Clients">
      <div
        className="clients_home"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home_icon} alt="home" />
      </div>
      <Header title={t("clients")} subtitle={t("description")} />
      {!loading && (
        <DataGrid
          rows={convertJSON(data)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          style={{
            maxWidth: "100% !important",
            maxHeight: "700px",
            backgroundColor: "rgba(34, 29, 58, 0.3)",
            color: "white",
            borderColor: "rgba(34, 29, 58, 0.3)",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
        />
      )}
    </div>
  );
};

export default Clients;
