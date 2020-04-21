const {User} = require('../../models/user')
const mongoose = require('mongoose');
const config =require('config');
const jwt = require('jsonwebtoken')

describe('user.generateAuthToken', ()=>{
    it('should return a valid JWT', () => {
        const payload = {
            _id : mongoose.Types.ObjectId().toHexString(),
            name : 'Test',
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decode).toMatchObject(payload);
    });
});