import supertest from 'supertest'
import { prismaClient } from '../src/application/database.js'
import { logger } from '../src/application/logging.js'
import { web } from '../src/application/web.js'

describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where:{
                username: "adha"
            }
        })
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: "adha",
            password: "rahasia",
            name: "rizki adha"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("adha")
        expect(result.body.data.name).toBe("rizki adha")
        expect(result.body.data.password).toBeUndefined()

    })

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: '',
            password: '',
            name: ''
        })

        logger.info(result.body);
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined();
    })
})
