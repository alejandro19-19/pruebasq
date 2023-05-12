import homePage_en from "./en/homePage.json";
import homePage_es from "./es/homePage.json";
import home_en from "./en/home.json";
import home_es from "./es/home.json";
import settings_en from "./en/settings.json";
import settings_es from "./es/settings.json";
import login_en from "./en/login.json"
import login_es from "./es/login.json"
import register_en from "./en/register.json"
import register_es from "./es/register.json"
import rooms_en from "./en/rooms.json"
import rooms_es from "./es/rooms.json"
import faceRegister_en from "./en/faceRegister.json"
import faceRegister_es from "./es/faceRegister.json"


export let languages = {
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      homePage: homePage_es,
      home: home_es,
      settings: settings_es,
      login: login_es,
      register: register_es,
      rooms: rooms_es,
      faceRegister: faceRegister_es,
    },
    en: {
      homePage: homePage_en,
      home: home_en,
      settings: settings_en,
      login: login_en,
      register: register_en,
      rooms: rooms_en,
      faceRegister: faceRegister_en,
    },
  },
};
