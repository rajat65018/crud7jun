const { SECRETKEY } = require("../../config");
const sessionModel = require("../models/session");
const userModel = require("../models/userModel");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function (passport) {
  const options = {};
  options.secretOrKey = SECRETKEY;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  passport.use(
    new JwtStrategy(options, async function (payload, done) {
      const user = await userModel.findOne({ _id: payload._id });
      if (!user) {
        done(null, false);
      }
      done(null, user);
    })
  );
};
