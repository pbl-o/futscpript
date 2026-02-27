import { pool } from "../db/consultas.js";

const getTeams = async () => {
  const consulta = "SELECT * from equipos";
  const { rows: equipos } = await pool.query(consulta);
  return equipos;
};

const addTeam = async (equipo) => {
  const consulta = "INSERT INTO equipos values (default, $1) RETURNING *";
  const { name } = equipo;
  const values = [name];
  const { rows: equipos } = await pool.query(consulta, values);
  return equipos;
};

const modelEquipos = { getTeams, addTeam };

export default modelEquipos;
