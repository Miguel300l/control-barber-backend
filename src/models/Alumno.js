import { Schema, model } from "mongoose";

const alumnoSchema = new Schema(
    {
        nombres: {
            type: String,
            required: true,
            trim: true
        },

        apellidos: {
            type: String,
            required: true,
            trim: true
        },

        tipoDocumento: {
            type: String,
            required: true,
            enum: ["Cédula", "Tarjeta de identidad"]
        },

        documento: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        celular: {
            type: String,
            required: true,
            trim: true
        },

        edad: {
            type: Number,
            required: true,
            min: 1
        },

        totalCurso: {
            type: Number,
            required: true,
            min: 0
        },

        abono: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Alumno", alumnoSchema);