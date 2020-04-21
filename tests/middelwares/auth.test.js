const {User} = require('../../models/user')
const auth = require('../../middelwares/auth')
const mongoose = require('mongoose');

describe('auth middleware',()=>{
    it('should populate req.user_token with payload of a valid JWT',() => {
        const user = {
            _id : mongoose.Types.ObjectId().toHexString(),
            name : 'Test',
            isAdmin: true
        };
        const token = 'Bearer '+new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res ={};
        const next = jest.fn();

        auth(req,res,next);
        expect(req.user_token).toMatchObject(user);
    })

    it('should return a status 400 for an invalid JWT',() => {
        const user = {
            _id : mongoose.Types.ObjectId().toHexString(),
            name : 'Test',
            isAdmin: true
        };
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {}
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        const next = jest.fn();

        auth(req,res,next);
        expect(res.status).toHaveBeenCalledWith(400);
    })

    it('should return a status 401 for no JWT',() => {
        const req = {
            header: jest.fn().mockReturnValue()
        };

        const res = {}
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        const next = jest.fn();

        auth(req,res,next);
        expect(res.status).toHaveBeenCalledWith(401);
    })
})