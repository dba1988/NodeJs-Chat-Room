const request = require('request')
describe('calc',()=>{
    it('should mulit 2and 2 ',()=>{
        expect(2*2).toBe(4)
    })
})

describe('Get Messages',()=>{
    it('should return 200 OK',(done)=>{
        request.get('http://localhost:3000/messages',(err,res)=>{
            console.log(res.body);
            expect(res.statusCode).toEqual(200)
            done();
        })
    })
    it('should list of message not empty ',(done)=>{
        request.get('http://localhost:3000/messages',(err,res)=>{
            console.log(res.body);
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done();
        })
    })
})