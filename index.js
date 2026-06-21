const express = require("express");
const fs = require("fs").promises;
const {
  createPath,
  readFile,
  nameFix,
  ageValidation,
  emailValidation,
  passwordValidation,
} = require("./middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", createPath, readFile, async (req, res) => {
  res.json(res.locals.users);
  return;
});
app.get("/:id", createPath, readFile, async (req, res) => {
  const id = parseInt(req.params.id);
  const user = res.locals.users.find((user) => user.id === id);
  res.json(user);
  return;
});

app.post(
  "/",
  createPath,
  readFile,
  nameFix,
  emailValidation,
  ageValidation,
  passwordValidation,

  async (req, res) => {
    const fixedName = res.locals.fixedName;
    const email = res.locals.email;
    const age = res.locals.age;
    const password = res.locals.password;

    const newUser = {
      id: Date.now(),
      name: fixedName,
      email: email,
      age: age,
      password: password,
    };

    res.locals.users.push(newUser);
    await fs.writeFile(
      res.locals.pathToDB,
      JSON.stringify(res.locals.users),
      "utf-8",
    );

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
    return;
  },
);

app.put(
  "/:id",
  createPath,
  readFile,
  nameFix,
  emailValidation,
  ageValidation,
  passwordValidation,
  async (req, res) => {
    const id = parseInt(req.params.id);

    const index = res.locals.users.findIndex((user) => user.id == id);

    if (index === -1) {
      res.json({ message: "User not found" });
      return;
    }

    const fixedName = res.locals.fixedName;
    const email = res.locals.email;
    const age = res.locals.age;
    const password = res.locals.password;
    res.locals.users[index] = {
      id,
      name: fixedName,
      email: email,
      age: age,
      password: password,
    };

    await fs.writeFile(res.locals.pathToDB, JSON.stringify(res.locals.users));
    res.status(201).json({
      message: "User updated successfully",
      user: res.locals.users[index],
    });
    return;
  },
);

app.patch("/:id", createPath, readFile, async (req, res) => {
  const id = parseInt(req.params.id);

  const index = res.locals.users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const user = res.locals.users[index];

  if (req.body.name && req.body.name !== "") {
    user.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  }

  if (
    req.body.email &&
    req.body.email.trim() !== "" &&
    ["gmail.com", "mail.ru", "mail.com"].includes(
      req.body.email.split("@").pop(),
    ) &&
    !res.locals.users.some(
      (user) => user.email === req.body.email && user.id !== id,
    )
  ) {
    user.email = req.body.email;
  }

  if (req.body.age && req.body.age < 65 && req.body.age >= 18) {
    user.age = req.body.age;
  }

  if (
    req.body.password &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      req.body.password,
    )
  ) {
    user.password = req.body.password;
  }

  await fs.writeFile(
    res.locals.pathToDB,
    JSON.stringify(res.locals.users),
    "utf-8",
  );

  return res.status(200).json({
    message: "User updated successfully",
    user,
  });
});

app.delete("/:id", createPath, readFile, async (req, res) => {
  const id = parseInt(req.params.id);

  const index = res.locals.users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = res.locals.users[index];

  res.locals.users.splice(index, 1);

  await fs.writeFile(
    res.locals.pathToDB,
    JSON.stringify(res.locals.users),
    "utf-8",
  );

  return res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser,
  });
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Running Server On Port ${PORT}`);
});
