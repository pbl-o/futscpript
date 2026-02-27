import modelJugadores from "../models/model.jugadores.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;

    const Authorization = req.header("Authorization");
    if (!Authorization) {
      throw { code: 401, message: "No token or no valid token" };
    }

    const token = Authorization.split("Bearer ")[1];

    try {
      //verificar
      jwt.verify(token, `${secretKey}`);

      //decode email
      const { name } = jwt.decode(token);
      console.log(
        `Usuario ${name}: Acceso a datos autorizado -> Obtener jugadores `,
      );
    } catch (error) {
      throw { code: 401, message: "Invalid Token" };
    }

    const jugadores = await modelJugadores.getPlayers(teamID);
    res.status(200).json(jugadores);
  } catch (error) {
    console.log(error);

    if (error.code === "42P01") {
      return res.status(404).json({ message: "Database not found" });
    }

    res
      .status(error.code || 500)
      .json({ message: error.server || "Server error" });
  }
};

const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugador = req.body;

    const Authorization = req.header("Authorization");

    if (!Authorization) {
      throw { code: 401, message: "No token or no valid token" };
    }

    const token = Authorization.split("Bearer ")[1];

    try {
      //verificar
      jwt.verify(token, `${secretKey}`);

      //decode email
      const { name } = jwt.decode(token);
      console.log(
        `Usuario ${name}: Acceso a datos autorizado -> Añadir jugador `,
      );
    } catch (error) {
         throw { code: 401, message: "Invalid Token" };
    }

    
    await modelJugadores.addPlayer({ jugador, teamID });
    res
      .status(201)
      .json({ message: `Jugador agregado con éxito a equipo ${teamID}` });
  } catch (error) {
    console.log(error);

    if (error.code === "42P01") {
      return res.status(404).json({ message: "Database not found" });
    }

    res
      .status(error.code || 500)
      .json({ message: error.message || "Server error" });
  }
};

const controllerJugadores = { obtenerJugadores, registrarJugador };

export default controllerJugadores;
