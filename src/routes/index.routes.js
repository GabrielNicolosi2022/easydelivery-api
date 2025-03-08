import { Router } from "express";

const indexRouter = Router();

indexRouter.use("/v1/api/operadores", driversRouter);
indexRouter.use("/v1/api/vehiculos", vehiclesRouter);
indexRouter.use("/v1/api/clientes", customersRouter);
indexRouter.use("/v1/api/entregas", deliveriesRouter);

export default indexRouter;
