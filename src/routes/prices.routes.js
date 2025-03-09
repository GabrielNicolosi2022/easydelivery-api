import { Router } from "express";
import {
  getPricesList,
  createPricesList,
} from "../controller/prices.controller.js";

const pricesRouter = Router();

// path: /v1/api/precios
// Traer lista completa de precios (zonas + adicionales)
pricesRouter.get("/", getPricesList);

// Traer precios por zona
pricesRouter.get("/zonas", (req, res) => {
  //TODO}
});

// Traer precios adicionales
pricesRouter.get("/adicionales", (req, res) => {
  //TODO}
});

// Crear precios por zona
pricesRouter.post("/zonas", createPricesList);

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

pricesRouter.delete("/:id", (req, res) => {
  //TODO}
});

export default pricesRouter;
