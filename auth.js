const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

//for verification
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic here
    try {
      console.log("Received credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username" });
      const isPassWordMatch = await user.comparePassword(password);
      if (isPassWordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport; //
