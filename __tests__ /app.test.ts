import request from "supertest";

import app from "../app";

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("server is healthy");
  });
});
