const request = require("supertest");
const app = require("../app");

describe("GET /students", () => {
  it("responds with json", async () => {
    const response = await request(app).get("/students");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(2);
  });
});
