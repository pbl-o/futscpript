import modelEquipos from "../models/model.equipos.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const obtenerEquipos = async (req, res) => {
  try {
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
      `Usuario ${name}: Acceso a datos autorizado -> Obtener Equipos `,
    );

    const equipos = await modelEquipos.getTeams();
    res.status(200).json(equipos);
  } catch (error) {
    console.log(error);
    res
      .status(error.code || 500)
      .json({ message: message.error || "Error del servidor" });
  }
};

const agregarEquipo = async (req, res) => {
  try {
    const equipo = req.body;

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
      `Usuario ${name}: Acceso a datos autorizado -> Agregar un equipo `,
    );

    await modelEquipos.addTeam(equipo);
    res.send({ message: "Equipo agregado con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({message: error.message || "Error del servidor"})
  }
};

const controllerEquipos = { obtenerEquipos, agregarEquipo };

export default controllerEquipos;
