const { v4: uuidv4 } = require("uuid");

const app = require("../../express")();

const usersController = require("./users.controllers");
const category_listController = require("../category_list/category_list.controllers");
const category_dataController = require("../category_data/category_data.controllers");
const expected_incomeController = require("../expected income/expected_income.controllers");
const transactionsController = require("../transactions/transactions.controllers");
const realIncomeController = require("../real_income/real_income.controllers");
//******************** GETS ****************************************
//** Getting all users
app.get("/", (req, res) => {
  (async () => {
    try {
      await usersController.getAllUsers().then((users) => {
        users.length
          ? res.status(200).json(users)
          : res
              .status(404)
              .send({ status: "404", msg: "USERS WERE NOT FOUND" });
      });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Getting a user by ID
app.get("/usersById", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await usersController.getUserById(user_id).then((user) => {
        user
          ? res.status(200).json(user)
          : res.status(404).send({ status: "404", msg: "USER NOT FOUND" });
      });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting a user by Google UID
app.get("/usersByUId", (req, res) => {
  const uid = req.query.uid;
  (async () => {
    try {
      await usersController.getUserByUId(uid).then((user) => {
        user
          ? res.status(200).json(user)
          : res.status(404).send({ status: "404", msg: "USER NOT FOUND" });
      });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting a user by email
app.get("/usersByEmail", (req, res) => {
  const email = req.query.email;
  (async () => {
    try {
      await usersController.getUserByEmail(email).then((user) => {
        user
          ? res.status(200).json(user)
          : res.status(404).send({
              status: "404",
              msg: `USER WITH EMAIL ${email} NOT FOUND`,
            });
      });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting a user by email
app.get("/usersByRole", (req, res) => {
  const role = req.query.role;
  (async () => {
    try {
      await usersController.getUsersByRole(role).then((users_by_role) => {
        users_by_role.length
          ? res.status(200).json(users_by_role)
          : res.status(404).send({
              status: "404",
              msg: `USERS WITH ROLE ${role} WERE NOT FOUND`,
            });
      });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//******************** POSTS ****************************************
app.post("/", (req, res) => {
  const user_id = uuidv4();
  const isFirstTime = true;
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role: req.body.role,
    uid: req.body.uid,
    creation_date: req.body.creation_date,
    isFirstTime,
    user_id,
  };
  console.log("USER AT END POINT:", user);
  (async () => {
    try {
      await usersController.createUser(user).then((newUser) => {
        const user_info_toSend = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        };
        newUser
          ? res.status(201).json(user_info_toSend)
          : res.status(503).send({
              status: "503",
              msg: `USER WITH EMAIL ${email} NOT CREATED - SERVER UNAVAILABLE`,
            });
        // res.status(201).json(newUser);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "Failed",
        msg: "Something went wrong saving Data...",
      });
    }
  })();
});

//******************** PUTS ****************************************
app.put("/", (req, res) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role: req.body.role,
    uid: req.body.uid,
    creation_date: req.body.creation_date,
    user_id: req.body.user_id,
    isFirstTime: req.body.isFirstTime,
  };

  (async () => {
    try {
      await usersController.updateUser(user).then((user_updated) => {
        res.status(201).json(user_updated);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "Failed",
        msg: "Something went wrong saving Data...",
      });
    }
  })();
});

//******************** DELETES ****************************************
//** Delete a transaction
app.delete("/", (req, res) => {
  const user_id = req.query.user_id;
  console.log("USER ID TO DELETE:", user_id);
  (async () => {
    try {
      await usersController.deleteUser(user_id).then(() => {
        res.status(200).send({
          status: "Success",
          msg: "User deleted successfully...",
        });
      });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// ** Delete a user and all Data of the user - Just for development
app.delete("/deleteUserAndData", async (req, res) => {
  const user_id = req.query.user_id;
  try {
    await category_dataController.deleteMultipleCategoryDataByUserID(user_id);
    await category_listController.deleteCategoryListByUserId(user_id);
    await expected_incomeController.deleteExpectedIncomeByUserID(user_id);
    await transactionsController.deleteTransactionsByUserID(user_id);
    await realIncomeController.deleteRealIncomesByUserID(user_id);
    await usersController.deleteUser(user_id).then(() => {
      res.status(200).send({
        status: "Success",
        msg: "User and all user data deleted successfully...",
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

module.exports = app;
