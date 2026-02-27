import { pool } from "../db/consultas.js";

const getPlayers = async (teamID) => {
  const consulta =
    "SELECT * from equipos as e INNER JOIN jugadores as j ON j.id_equipo = e.id WHERE e.id = $1";
  const values = [teamID];
  const { rows: jugadores } = await pool.query(consulta, values);
  return jugadores;
};

const addPlayer = async ({ jugador, teamID }) => {
  const { name, position } = jugador;
  const consulta =
    "INSERT INTO jugadores (id ,id_equipo, name, position) values (default, $1, $2, $3)  RETURNING *";
  const values = [teamID, name, position];
  const { rows: player } = await pool.query(consulta, values);
  return player[0];
};

const modelJugadores = { getPlayers, addPlayer };

export default modelJugadores;
