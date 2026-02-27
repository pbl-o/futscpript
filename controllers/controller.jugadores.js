import  modelJugadores from '../models/model.jugadores.js'
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY

const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params
//////////////!!!!!!REVISAR!!!!!!!!
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    //verificar
    jwt.verify(token, `${secretKey}`);
    //ejectuar acción autorizada

    //decode email
    const { name } = jwt.decode(token);
    console.log(`Usuario ${name}: Acceso a datos autorizado -> Obtener jugadores `);

    const jugadores = await modelJugadores.getPlayers(teamID)
    res.json(jugadores)
}

const registrarJugador = async (req, res) => {
    const { teamID } = req.params

    //////////////!!!!!!REVISAR!!!!!!!!
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    //verificar
    jwt.verify(token, `${secretKey}`);
    //ejectuar acción autorizada

    //decode email
    const { name } = jwt.decode(token);
    console.log(`Usuario ${name}: Acceso a datos autorizado -> Añadir jugador `);


    const jugador = req.body
    await modelJugadores.addPlayer({ jugador, teamID })
    res.status(201).json({ message: `Jugador agregado con éxito a equipo ${teamID}` })
}


const controllerJugadores  = { obtenerJugadores, registrarJugador };

export default controllerJugadores