import { Router } from "express";
import driversRouter from "./operators.routes.js";
import vehiclesRouter from "./vehicles.routes.js";
import customersRouter from "./customers.routes.js";
import deliveriesRouter from "./deliveries.routes.js";
import pricesRouter from "./prices.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/operadores", driversRouter);
indexRouter.use("/v1/api/vehiculos", vehiclesRouter);
indexRouter.use("/v1/api/clientes", customersRouter);
indexRouter.use("/v1/api/entregas", deliveriesRouter);
indexRouter.use("/v1/api/precios", pricesRouter);

export default indexRouter;
