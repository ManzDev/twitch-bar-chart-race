import "@/components/BarChartRace.js";
import data from "@/assets/days.js";

const container = document.querySelector(".container");
const barChartRace = document.createElement("bar-chart-race");
barChartRace.setData(data);
container.appendChild(barChartRace);
