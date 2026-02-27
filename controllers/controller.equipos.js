import modelEquipos from "../models/model.equipos.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const obtenerEquipos = async (req, res) => {
    //////////////!!!!!!REVISAR!!!!!!!!
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    //verificar
    jwt.verify(token, `${secretKey}`);
    //ejectuar acción autorizada

    //decode email
    const { name } = jwt.decode(token);
    console.log(`Usuario ${name}: Acceso a datos autorizado -> Obtener Equipos `);

  const equipos = await modelEquipos.getTeams();
  res.json(equipos);
};

const agregarEquipo = async (req, res) => {
  const equipo = req.body;

  //////////////!!!!!!REVISAR!!!!!!!!
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
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
};

const controllerEquipos = { obtenerEquipos, agregarEquipo };

export default controllerEquipos;
