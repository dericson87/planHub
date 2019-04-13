var expect = require("chai").expect;
var models = require("../models");

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});

describe("model tests", function() {
  var userData = { name: "Holden", email: "h@gmail.com", password: "password" };

  it("should create a new user", function() {
    models.User.create(userData).then(function(user) {
      expect(user.name).to.equal("Holden");
      expect(user.email).to.equal("h@gmail.com");
      expect(user.password).to.equal("password");
      done();
    });
  });
});
