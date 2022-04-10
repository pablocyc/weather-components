import "./components/SensorCard.js";

const todayText = document.querySelector(".today-text");

const date = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
todayText.innerHTML = new Intl.DateTimeFormat("es-US", options).format(date);
