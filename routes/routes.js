import { Router } from "express";
import dotenv from "dotenv";
dotenv.config()

import controllerJugadores from "../controllers/controller.jugadores.js"
import controllerEquipos from "../controllers/controller.equipos.js";


const router = Router()


router.get("/", controllerEquipos.obtenerEquipos);
router.post("/", controllerEquipos.agregarEquipo);

router.get("/:teamID/jugadores", controllerJugadores.obtenerJugadores);
router.post("/:teamID/jugadores", controllerJugadores.registrarJugador);


export default router