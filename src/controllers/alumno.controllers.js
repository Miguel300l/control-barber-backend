import Alumno from '../models/Alumno.js';

// Obtener todos los alumnos
export const obtenerAlumnos = async (req, res, next) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        next(error);
    }
};

// Obtener un alumno por ID
export const obtenerAlumnoPorId = async (req, res, next) => {
    try {
        const alumno = await Alumno.findById(req.params.id);

        if (!alumno) {
            res.status(404);
            throw new Error('Alumno no encontrado');
        }

        res.json(alumno);
    } catch (error) {
        next(error);
    }
};

export const obtenerAlumnoPorDocumento = async (req, res, next) => {
    try {
        const { documento } = req.params;

        const alumno = await Alumno.findOne({ documento });

        if (!alumno) {
            res.status(404);
            throw new Error("Alumno no encontrado");
        }

        res.json(alumno);
    } catch (error) {
        next(error);
    }
};

// Crear un alumno
export const crearAlumno = async (req, res, next) => {
    try {
        const {
            nombres,
            apellidos,
            tipoDocumento,
            documento,
            celular,
            edad,
            totalCurso,
            abono,
            fecha
        } = req.body;

        const alumnoExistente = await Alumno.findOne({ documento });

        if (alumnoExistente) {
            res.status(400);
            throw new Error("Ya existe un alumno con ese documento");
        }

        const saldoPendiente = Number(totalCurso) - Number(abono);

        if (saldoPendiente < 0) {
            res.status(400);
            throw new Error(
                "El abono no puede ser mayor al valor total del curso"
            );
        }

        const alumno = await Alumno.create({
            nombres,
            apellidos,
            tipoDocumento,
            documento,
            celular,
            edad,
            totalCurso,
            abono,
            saldoPendiente,
            fecha
        });

        res.status(201).json(alumno);
    } catch (error) {
        next(error);
    }
};

// Actualizar un alumno
export const actualizarAlumno = async (req, res, next) => {
    try {
        const alumno = await Alumno.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!alumno) {
            res.status(404);
            throw new Error('Alumno no encontrado');
        }

        res.json(alumno);
    } catch (error) {
        next(error);
    }
};

// Eliminar un alumno
export const eliminarAlumno = async (req, res, next) => {
    try {
        const alumno = await Alumno.findById(req.params.id);

        if (!alumno) {
            res.status(404);
            throw new Error('Alumno no encontrado');
        }

        await alumno.deleteOne();

        res.json({ mensaje: 'Alumno eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};