const ageValidation = (req, res, next) => {
  if (req.body.age && req.body.age < 65 && req.body.age >= 18) {
    const age = req.body.age;
    res.locals.age = age;
    next();
  } else {
    res.status(400).json({
      message: "Something went wrong with age!",
    });
  }
};

module.exports.ageValidation = ageValidation;
