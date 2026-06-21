const path = require("path");

const createPath = (req, res, next) => {
  try {
    const pathToDB = path.join(__dirname, "..", "db", "users.json");
    res.locals.pathToDB = pathToDB;
    next();
  } catch (err) {
    res.json({message: err});
  }
};

module.exports.createPath = createPath;
