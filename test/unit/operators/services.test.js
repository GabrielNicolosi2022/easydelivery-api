import config from "../../../src/config/config.js";
import * as services from "../../../src/services/operators.services.js";
import mongoose from "mongoose";
import {
  arrayData,
  data_1,
  data_2,
  incompleteData,
  invalidData,
} from "../../mocks/operators.mocks.js";
import { before, beforeEach, describe } from "mocha";
import { expect } from "chai";
import getLogger from "../../../src/utils/log.utils.js";

const log = getLogger();

// Conexion con la base de datos
const DB_URI = config.db.testing;

describe("Operator services testing", function () {
  this.timeout(5000);
  let connection;
  // Antes de iniciar los test conectar con la base de datos
  before(async () => {
    connection = await mongoose.connect(DB_URI);
  });
  // Despues de todos los test, cerrar la conexión
  after(async () => {
    await connection.disconnect();
  });
  // Por cada item del test borra la base de datos 'testing'
  beforeEach(async () => {
    await mongoose.connection.collections.operators.deleteMany({});
  });

  describe("create function", () => {
    it("It should create operator list correctly", async () => {
      const response = await services.create(arrayData);

      expect(response).to.be.ok;
      expect(response).to.be.an("array");
      expect(response[0].last_name).to.be.equal(arrayData[0].last_name);
      expect(response[1].phone).to.be.equal(arrayData[1].phone);
    });

    it("It should create a operator correctly", async () => {
      const response = await services.create(data_1);

      expect(response).to.be.ok;
      expect(response).to.be.an("object");
      expect(response.last_name).to.be.equal(data_1.last_name);
      expect(response.phone).to.be.equal(data_1.phone);
    });

    it("It should handle duplicate data", async () => {
      await services.create(data_2);
      try {
        await services.create(data_2);
      } catch (error) {
        expect(error.message).to.include("duplicate key error");
      }
    });

    it("It should handle invalid data", async () => {
      try {
        await services.create(invalidData);
      } catch (error) {
        expect(error).to.exist;
      }
    });

    it("It should handle incomplete data", async () => {
      try {
        await services.create(incompleteData);
      } catch (error) {
        expect(error).to.exist;
      }
    });

    it("It should handle asynchronous operations correctly", async () => {
      const responsePromise = services.create(data_1);

      expect(responsePromise).to.be.a("Promise");

      const response = await responsePromise;

      expect(response).to.be.an("object");
    });
  });

  describe("getAll function", () => {
    it("It should return all operators", async () => {
      await services.create(arrayData);
      const response = await services.getAll();

      expect(response).to.be.ok;
      expect(response).to.be.an("array");
      expect(response).to.have.lengthOf(arrayData.length);

      const usernamesInResponse = response.map((operator) => operator.username);
      const expectedUsernames = usernamesInResponse.map((username) => username);

      expect(usernamesInResponse).to.have.deep.equal(expectedUsernames);
    });

    it("It should return an empty array if there are no operators", async () => {
      // La base de datos ya está limpia por el beforeEach
      const allOperators = await services.getAll();

      expect(allOperators).to.be.an("array");
      expect(allOperators).to.be.lengthOf(0);
    });
  });

  describe("getById function", () => {
    it("It should return an operator by id", async () => {
      const createdOperator = await services.create(data_1);
      const response = await services.getById(createdOperator._id);

      expect(response).to.be.ok;
      expect(response).to.be.an("object");
      expect(response._id.toString()).to.be.equal(
        createdOperator._id.toString()
      );
    });

    it("It should return null if the operator does not exist", async () => {
      const response = await services.getById(new mongoose.Types.ObjectId());

      expect(response).to.be.null;
    });
  });

  describe("getByUsername function", () => {
    it("It should return an operator by username", async () => {
      await services.create(data_1);
      const response = await services.getByUsername(data_1.username);

      expect(response).to.be.ok;
      expect(response).to.be.an("object");
      expect(response.username).to.be.equal(data_1.username);
    });

    it("It should return null if the operator does not exist", async () => {
      const response = await services.getByUsername("nonexistentUsername");

      expect(response).to.be.null;
    });
  });

  describe("update function", () => {
    it("It should update an operator correctly", async () => {
      const createdOperator = await services.create(data_1);
      const updatedData = { phone: "1234567890" };
      const response = await services.update(createdOperator._id, updatedData);

      expect(response).to.be.ok;
      expect(response).to.be.an("object");
      expect(response.phone).to.be.equal(updatedData.phone);
    });

    it("It should return null if the operator does not exist", async () => {
      const response = await services.update(new mongoose.Types.ObjectId(), {
        phone: "1234567890",
      });

      expect(response).to.be.null;
    });
  });

  describe("deleteOne function", () => {
    it("It should deletean operator correctly", async () => {
      const createdOperator = await services.create(data_1);
      const response = await services.deleteOne(createdOperator._id);

      expect(response).to.be.ok;
      expect(response.deletedCount).to.be.equal(1);
    });

    it("It should return 0 deletedCount if the operrator does not exist", async () => {
      const response = await services.deleteOne(new mongoose.Types.ObjectId());

      expect(response.deletedCount).to.be.equal(0);
    });
  });
});
