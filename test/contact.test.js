import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test.util.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", function () {
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

describe("GET /api/contact/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web).get("/api/contacts/" + testContact.id).set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    })

    it('should return 404 if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web).get("/api/contacts/" + (testContact.id + 1)).set("Authorization", "test");

        expect(result.status).toBe(404);
    })
})

describe("PUT /api/contact/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
            first_name: "rizki",
            last_name: "adha",
            email: "rizkiadha@gmail.com",
            phone: "0809237423"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("rizki");
        expect(result.body.data.last_name).toBe("adha");
        expect(result.body.data.email).toBe("rizkiadha@gmail.com");
        expect(result.body.data.phone).toBe("0809237423");
    })

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
            first_name: "",
            last_name: "",
            email: "rizkiadha@gmail.com",
            phone: "0809237423"
        });

        expect(result.status).toBe(400);
    })
    
    it('should reject if request is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + (testContact.id + 1)).set("Authorization", "test").send({
            first_name: "rizki",
            last_name: "adha",
            email: "rizkiadha@gmail.com",
            phone: "0809237423"
        });

        expect(result.status).toBe(404);
    })
})