import profile from "../../assets/profile.jpg";
import reservations from "../../assets/img3.png";
import rooms from "../../assets/img4.jpg";

const ADMIN = "admin";
const RECEPTIONIST = "receptionist";
const CLIENT = "client";

let linksManager = [];
let linksReceptionist = [];
let linksUser = [];

export function generateLinks(type, func) {
  switch (type) {
    case ADMIN:
      return (linksManager = [
        {
          title: func("profile"),
          description: func("profile_description"),
          image: profile,
          number: 1,
          color: "red",
          path: "/profile",
        },
        {
          title: func("rooms"),
          description: func("rooms_description"),
          image: rooms,
          number: 2,
          color: "purple",
          path: "/rooms",
        },
      ]);
    case RECEPTIONIST:
      return (linksUser = [
        {
          title: func("profile"),
          description: func("profile_description"),
          image: profile,
          number: 1,
          color: "red",
          path: "/profile",
        },
        {
          title: func("rooms"),
          description: func("rooms_description"),
          image: rooms,
          number: 2,
          color: "purple",
          path: "/faceRegister",
        },
      ]);

    case CLIENT:
      return (linksUser = [
        {
          title: func("profile"),
          description: func("profile_description"),
          image: profile,
          number: 1,
          color: "red",
          path: "/profile",
        },
        {
          title: func("reservations"),
          description: func("reservations_description"),
          image: reservations,
          number: 2,
          color: "purple",
          path: "/reservations",
        },
      ]);
  }
}
