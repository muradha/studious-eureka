import supertest from "supertest";
import { createTestUser, getTestUser, removeTestUser } from "./test.util.js";
import { web } from "../src/application/web.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "rahasia",
      name: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia"
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should reject if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  afterEach(async () => {
    await removeTestUser();
  });
});


describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  })

  it('should can get current user', async () => {
    const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  })

  it('should reject token is invalid', async () => {
    const result = await supertest(web).get('/api/users/current').set('Authorization', 'salah');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  })
})

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  })

  it('should can update user', async () => {
    const result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      name: "Rizki",
      password: "rahasialagi"
    })

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Rizki");

    const user = await getTestUser();

    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  })

  it('should can update user name', async () => {
    const result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      name: "Rizki",
      password: "rahasialagi"
    })

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Rizki");
  })

  it('should can update password', async () => {
    const result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      password: "rahasialagi"
    })

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");

    const user = await getTestUser();

    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  })

  it('should reject if request is not valid', async () => {
    const result = await supertest(web).patch("/api/users/current").set("Authorization", "salah").send({
    })

    expect(result.status).toBe(401);
  })

});


describe("DELETE /api/users/logout", () => {

  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  })

  it('should can logout', async () => {
    const result = await supertest(web).delete('/api/users/logout').set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();

    expect(user.token).toBeNull();
  })

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(web).delete('/api/users/logout').set("Authorization", "salah");

    expect(result.status).toBe(401);
  })
})