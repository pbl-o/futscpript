import express from "express";
import { getDataConnection } from "./db/consultas.js";

const app = express();

app.listen(3000, () => {
  console.log("SERVER ON");
  getDataConnection();
});

app.use(express.json());

import controllerJugadores from "./controllers/controller.jugadores.js";
import controllerEquipos from "./controllers/controller.equipos.js";
import controllerUser from "./controllers/controller.login.js";

//Autenticación / Autorización:
app.post("/login", controllerUser.verifyUser);

app.get("/equipos", controllerEquipos.obtenerEquipos);
app.post("/equipos", controllerEquipos.agregarEquipo);

app.get("/equipos/:teamID/jugadores", controllerJugadores.obtenerJugadores);
app.post("/equipos/:teamID/jugadores", controllerJugadores.registrarJugador);

app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
})

export default app