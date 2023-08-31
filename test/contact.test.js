import supertest from "supertest";
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test.util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts", function() {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should can create new contact", async () => {
        const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
            first_name: "test",
            last_name: "test",
            email: "test@rizki.com",
            phone: "0809000000"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@rizki.com");
        expect(result.body.data.phone).toBe("0809000000");
    })

    it("should reject if request is not valid", async () => {
        const result = await supertest(web).post('/api/contacts').set("Authorization", "test").send({
            first_name: "",
            last_name: "test",
            email: "test",
            phone: "08090000998823828800"
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})