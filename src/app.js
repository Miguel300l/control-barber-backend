import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import alumnoRoutes from "./routes/alumno.routes.js";
import csrfRoutes from "./routes/csrf.routes.js";
import cookieParser from "cookie-parser";
import { createRoles } from "./config/initialRoles.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
createRoles();

app.use(cors({
    origin: [
        "https://inventario-tienda.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/csrf-token", csrfRoutes
);

app.use(errorHandler);

export default app;