import { Router } from "express";
import {
  createOperator,
  getAllOperators,
} from "../controller/operators.controller.js";

const operatorsRouter = Router();

// Obtener todos los operadores
operatorsRouter.get("/", getAllOperators);

operatorsRouter.get("/:id", (req, res) => {
  //TODO
});

operatorsRouter.get("/choferes", (req, res) => {
  //TODO}
});

operatorsRouter.get("/choferes/:id", (req, res) => {
  //TODO}
});
// Crear nuevo operador
operatorsRouter.post("/", createOperator); //TODO middleware: solo admin

operatorsRouter.patch("/:id", (req, res) => {
  //TODO}
});

operatorsRouter.delete("/:id", (req, res) => {
  //TODO}
});

export default operatorsRouter;
