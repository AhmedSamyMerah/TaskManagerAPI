const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {dbSetup, userOne, userOneId} = require('./fixtures/db')

beforeEach(dbSetup)

test('Should signup user', async()=>{
   const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)

    //assert that db changed
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assert response
    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should login', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login fake user', async()=>{
    await request(app).post('/users/login').send({
        email: 'dub@dub.com',
        password: 'hdsakjhasjkl'
    }).expect(400)
})

test('Should get profile', async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not send back profile', async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account', async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user', async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Upload an avatar', async () =>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should upddate valid fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'John'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('John')
})

test('Should not upddate invalid fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            country: 'Canada'
        })
        .expect(400)
})