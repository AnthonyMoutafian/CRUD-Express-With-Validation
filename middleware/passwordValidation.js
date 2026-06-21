const passwordValidation = (req, res, next) => {
  if (
    req.body.password &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      req.body.password,
    )
  ) {
    res.locals.password = req.body.password;
    next();
  } else {
    res.status(400).json({
      message: "Password must meet the requirements!",
    });
  }
};

module.exports.passwordValidation = passwordValidation;
