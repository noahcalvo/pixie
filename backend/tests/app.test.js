const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const studentSchema = require("../models/Student");
const { MongoMemoryServer } = require("mongodb-memory-server");

const testStudent = {
  name: "Test Student",
  email: "test.student@example.com",
  rollno: "12345",
};

const invalidStudent = {
  name: "Man without email",
  rollno: "12346",
};

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  // Start the server and then connect to a test database for testing purposes
  await mongoServer.start();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  // Clean up the test database after each test
  await studentSchema.deleteMany({});
});

afterAll(async () => {
  // Close the test database connection and stop the in-memory MongoDB instance after all tests have run
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Student API", () => {
  it("should create a new student", async () => {
    const res = await request(app)
      .post("/students/create-student")
      .send(testStudent);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe(testStudent.name);
    expect(res.body.email).toBe(testStudent.email);
    expect(res.body.rollno).toBe(Number(testStudent.rollno));
  });

  it("should throw 400 when create-student doesn't contain email in body", async () => {
    const res = await request(app)
      .post("/students/create-student")
      .send(invalidStudent);
    expect(res.statusCode).toEqual(400);
    console.log(res.body);
  });

  it("should return a list of students", async () => {
    await studentSchema.create(testStudent);
    const res = await request(app).get("/students");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should return a single student and update it", async () => {
    const createdStudent = await studentSchema.create(testStudent);
    const resGet = await request(app).get(
      `/students/update-student/${createdStudent._id}`
    );
    expect(resGet.statusCode).toEqual(200);
    expect(resGet.body.name).toBe(testStudent.name);

    const updatedStudent = { ...testStudent, name: "Updated Student" };
    const resPut = await request(app)
      .put(`/students/update-student/${createdStudent._id}`)
      .send(updatedStudent);
    expect(resPut.statusCode).toEqual(204);

    const updated = await studentSchema.findById(createdStudent._id);
    expect(updated.name).toBe(updatedStudent.name);
  });

  it("should delete a student", async () => {
    const createdStudent = await studentSchema.create(testStudent);
    const res = await request(app).delete(
      `/students/delete-student/${createdStudent._id}`
    );
    expect(res.statusCode).toEqual(200);
    const deleted = await studentSchema.findById(createdStudent._id);
    expect(deleted).toBeNull();
  });
});
