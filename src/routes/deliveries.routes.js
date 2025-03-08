import { Router } from "express";

const deliveriesRouter = Router();

/* Crear entrega */
deliveriesRouter.post("/", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso el admin o el customer
});

/* Modificar entrega */
deliveriesRouter.patch("/:id", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso el admin o el customer creador
});

/* Eliminar entrega */
deliveriesRouter.del("/:id", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso el admin o el customer creador
});

/* Traer Actual */
deliveriesRouter.get("/today", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso un admin, admin-driver o driver
});

/* Traer Semanal */
deliveriesRouter.get("/weekly", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso un admin, admin-driver o driver
});

/* Traer Historial */
deliveriesRouter.get("/record", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso un admin, admin-driver o driver
});
deliveriesRouter.get("/record/:id", (req, res) => {
  //TODO Tener en cuenta un middleware para que solo tenga acceso un admin, admin-driver o driver
});

export default deliveriesRouter;
