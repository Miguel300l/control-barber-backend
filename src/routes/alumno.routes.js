import { Router } from "express";
import {
    obtenerAlumnos,
    obtenerAlumnoPorId,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} from "../controllers/alumno.controllers.js";
import { csrfProtection } from "../middlewares/csrf.middleware.js";

const router = Router();

router.get("/", obtenerAlumnos);

router.get("/:id", obtenerAlumnoPorId);

router.post("/", csrfProtection, crearAlumno);

router.put("/:id", csrfProtection, actualizarAlumno);

router.delete("/:id", csrfProtection, eliminarAlumno);

export default router;