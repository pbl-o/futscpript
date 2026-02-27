import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/routes.js";
import { getDataConnection } from "./db/consultas.js";

//Por razones de tiempo queda pendiente (para ser implementado en un futuro próximo):
//Crear carpeta lib con errores más comunes.
//Crear middleware para evaluación de tokens

const app = express();
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log("SERVER ON");
  getDataConnection();
});

app.use(express.json());
app.use("/equipos", router);

import controllerUser from "./controllers/controller.login.js";

//Autenticación / Autorización:
app.post("/login", controllerUser.verifyUser);

app.use("*", (req, res) => {
  res.status(404).send({ message: "La ruta que intenta consultar no existe" });
});

export default app;
