const emailValidation = (req, res, next) => {
  if (
    req.body.email &&
    req.body.email.trim() !== "" &&
    ["gmail.com", "mail.ru", "mail.com"].includes(
      req.body.email.split("@").pop(),
    ) &&
    !res.locals.users.some((user) => user.email === req.body.email)
  ) {
    res.locals.email = req.body.email;
    next();
  } else {
    res.status(400).json({
      message: "Invalid email or email already exists!",
    });
  }
};

module.exports.emailValidation = emailValidation;
