const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const models = require('../models');
const app = require('../server');
let should = chai.should();
chai.use(chaiHttp);
let expect = chai.expect;

describe("Curd operations", function () {
  const requester = chai.request(app).keepOpen();
  let dummyPost;
  before(async () => {
    dummyUser = await models.User.create({name: "pragnya", email: "csepe49n5pdas21@gmail.com"});
    //console.log(dummyUser)
  });

  after(async () => {
    if (requester) await requester.close();
    await models.User.destroy({
      where: {
          id: dummyUser.id
      }
    });
  });

  describe("#Graphql", function () {
    it("Find user", function (done) {
      requester.post("/graphql")
        .send({query: '{ user(id: '+ dummyUser.id +') { id name } }'})
        .end((err, res) => {
          //console.log("print res sinhgle user**** ",res);
          if (err) return done(err);
          res.body.data.user.should.have.property('id');
          res.body.data.user.should.have.property('name');
          done();
        });
    });

    it("Find All user", function (done) {
      requester.post("/graphql")
        .send({query: '{ users { id name email  } }'})
        .end((err, res) => {
          if (err) return done(err);
         // res.body.data.users.should.have.lengthOf(30);
          res.body.data.users[0].should.have.property("name");
          res.body.data.users[0].should.have.property("email");
          done();
        });
    });

  });

  describe('#For Create user', function () {
    it('#For Create user', function (done) {
      requester.post("/graphql")
      .send({query: 'mutation{ createUser( name: "pinky" ,email: "ppdsadjjjdds221@gmail.com") { name,email } }'}) 
      .end((err, res) => {
        //console.log("print res sinhgle user**** ",res.body);
        if (err) return done(err);
        res.body.data.createUser.should.have.property("name");
        res.body.data.createUser.should.have.property("email");
        done();
      });
    })
  })
  
  // describe('#For Update user', function () {
  //   it('#For Create user', function (done) {
  //     requester.post("/graphql")
  //     .send({query: 'mutation{ updateUser(id: '+ dummyUser.id +' , name: '+ dummyUser.name +' ,email: '+ dummyUser.email +') {  name email } }'})
  //     .end((err, res) => {
  //      // console.log("print res sinhgle user**** ",res);
  //       if (err) return done(err);
  //       //res.body.data.user.should.have.property('id');
  //      // res.body.data.user.should.have.property('name');
  //       done();
  //     });
  //   })
  // })

  // describe('#For Delete user', function () {
  //   it('#For Delete user', function (done) {
  //     requester.post("/graphql")
  //     .send({query: 'mutation{ deleteUser(id: '+ dummyUser.id +') { id name } }'})
  //     .end((err, res) => {
  //      // console.log("print res sinhgle user**** ",res);
  //       if (err) return done(err);
  //       //res.body.data.user.should.have.property('id');
  //      // res.body.data.user.should.have.property('name');
  //       done();
  //     });
  //   })
  // })

});