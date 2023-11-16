import request from "supertest";

import app from "../../app";
import { Lab } from "../../models/Labs";
import mongoose from "mongoose";
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_DB as string);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Labs routes", () => {
  test("Get all Labs", async () => {
    const res = await request(app).get("/api/v1/labs");
    const labs = await Lab.find();
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(labs.length);
  });
  test("Get lab by id", async () => {
    const res = await request(app).get("/api/v1/labs/648bb0dee245e7cd37287ffd");
    expect(res.status).toBe(200);
    expect(res.body._id).toEqual("648bb0dee245e7cd37287ffd");
    expect(res.body.name).toEqual("Web dev");
  });
  test("Delete LAb", async () => {
    const res = await request(app).get("/api/v1/labs/648bb0dee245e7cd37287ffd");

    expect(res.status).toBe(200);
    expect(res.body._id).toEqual("648bb0dee245e7cd37287ffd");
    expect(res.body.name).toEqual("Web dev");
  });
});
