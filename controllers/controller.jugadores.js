import modelJugadores from "../models/model.jugadores.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;

    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    if (!Authorization) {
      throw { code: 401, message: "No token or no valid token" };
    }

    //verificar
    jwt.verify(token, `${secretKey}`);
    //ejectuar acción autorizada

    //decode email
    const { name } = jwt.decode(token);
    console.log(
      `Usuario ${name}: Acceso a datos autorizado -> Obtener jugadores `,
    );

    const jugadores = await modelJugadores.getPlayers(teamID);
    res.status(200).json(jugadores);
  } catch (error) {
    console.log(error);
    res
      .status(error.code || 500)
      .json({ message: error.server || "Server error" });
  }
};

const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params;

    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];

        if (!Authorization) {
      throw { code: 401, message: "No token or no valid token" };
    }

    //verificar
    jwt.verify(token, `${secretKey}`);
    //ejectuar acción autorizada

    //decode email
    const { name } = jwt.decode(token);
    console.log(
      `Usuario ${name}: Acceso a datos autorizado -> Añadir jugador `,
    );

    const jugador = req.body;
    await modelJugadores.addPlayer({ jugador, teamID });
    res
      .status(201)
      .json({ message: `Jugador agregado con éxito a equipo ${teamID}` });
  } catch (error) {
    console.log(error);
    res
      .status(error.code || 500)
      .json({ message: error.server || "Server error" });
  }
};

const controllerJugadores = { obtenerJugadores, registrarJugador };

export default controllerJugadores;
