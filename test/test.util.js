import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "080900000"
        }
    })
}

const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

const createManyTestContacts = async () => {
    for (let index = 0; index < 15; index++) {
        await prismaClient.contact.create({
            data: {
                username: "test",
                first_name: `test ${index}`,
                last_name: `test ${index}`,
                email: `test${index}@gmail.com`,
                phone: `080900000${index}`
            }
        })
    }
}

const removeAllTestAdresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}

const createTestAddress = async() =>{
    const contact = await getTestContact();
    await prismaClient.address.create({
        data:{
            contact_id: contact.id,
            street: "jalan test",
            city: "kota test",
            province: "province test",
            country: "indonesia",
            postal_code: "234234"
        }
    })
}

const getTestAddress = async() => {
    return prismaClient.address.findFirst({
        where:{
            contact:{
                username: "test"
            }
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    getTestUser,
    removeAllTestContacts,
    createTestContact,
    getTestContact,
    createManyTestContacts,
    removeAllTestAdresses,
    createTestAddress,
    getTestAddress
}