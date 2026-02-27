import modelEquipos from "../models/model.equipos.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const obtenerEquipos = async (req, res) => {
  try {
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
        `Usuario ${name}: Acceso a datos autorizado -> Obtener Equipos `,
      );
    } catch (error) {
      throw { code: 401, message: "Invalid Token" };
    }

    const equipos = await modelEquipos.getTeams();
    res.status(200).json(equipos);
  } catch (error) {
    console.log(error);

        if (error.code === "42P01") {
      return res.status(404).json({message: "Database not found" });
    }

    res
      .status(error.code || 500)
      .json({ message: error.message || "Error del servidor" });
  }
};

const agregarEquipo = async (req, res) => {
  try {
    const equipo = req.body;

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
        `Usuario ${name}: Acceso a datos autorizado -> Agregar un equipo `,
      );
    } catch (error) {
      throw { code: 401, message: "Invalid Token" };
    }

    await modelEquipos.addTeam(equipo);
    res.send({ message: "Equipo agregado con éxito" });
  } catch (error) {

    console.log(error)

    if (error.code === "42P01") {
      return res.status(404).json({message: "Database not found" });
    }

    res
      .status(error.code || 500)
      .json({ message: error.message || "Error del servidor" });
  }
};

const controllerEquipos = { obtenerEquipos, agregarEquipo };

export default controllerEquipos;
