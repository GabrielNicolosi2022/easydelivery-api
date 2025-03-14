import { Router } from "express";
import {
  createOperator,
  deleteOperator,
  getAllOperators,
  getOperatorById,
  getOperatorByUsername,
  updateOperator,
} from "../controller/operators.controller.js";

const operatorsRouter = Router();

// Obtener todos los operadores
operatorsRouter.get("/", getAllOperators);
// Obtener un operadores por username
operatorsRouter.get("/by-username", getOperatorByUsername);
// Obtener un operadores por id
operatorsRouter.get("/:id", getOperatorById);

operatorsRouter.get("/choferes", (req, res) => {
  //TODO}
});

operatorsRouter.get("/choferes/:id", (req, res) => {
  //TODO}
});
// Crear nuevo operador
operatorsRouter.post("/", createOperator); //TODO middleware: solo admin
// Actualizar operador
operatorsRouter.patch("/:id", updateOperator);
// Eliminar operador
operatorsRouter.delete("/:id", deleteOperator); //TODO middleware: solo admin

export default operatorsRouter;
