import { Router } from "express";
import * as controllers from "../controller/prices.controller.js";

const pricesRouter = Router();

// path: /v1/api/precios
// Traer lista completa de precios (zonas + adicionales)
pricesRouter.get("/", controllers.getPricesList);

// Traer precios por zona
pricesRouter.get("/zonas", controllers.createPricesList);

// Traer precios adicionales
pricesRouter.get("/adicionales", (req, res) => {
  //TODO}
});

// Crear precios por zona
pricesRouter.post("/zonas", (req, res) => {
  //TODO}
});

// Modificar zona
pricesRouter.patch("/zonas/:id", (req, res) => {
  //TODO}
});

// Crear precios adicionales
pricesRouter.post("/adicionales", (req, res) => {
  //TODO}
});

// Modificar precios por zona
pricesRouter.patch("/zonas/:id", (req, res) => {
  //TODO}
});

// Modificar precios adicionales
pricesRouter.patch("/adicionales/:id", (req, res) => {
  //TODO}
});

pricesRouter.del("/:id", (req, res) => {
  //TODO}
});

export default pricesRouter;
