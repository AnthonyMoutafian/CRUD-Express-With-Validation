const nameFix = (req, res, next) => {
  if (req.body.name && req.body.name.trim() !== "") {
    const fixedName =
      req.body.name.charAt(0).toUpperCase() +
      req.body.name.slice(1);

    res.locals.fixedName = fixedName;
    next();
  } else {
    res.status(400).json({
      message: "Name Can't Be Empty!",
    });
  }
};

module.exports.nameFix = nameFix;