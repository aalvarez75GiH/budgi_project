const usersController = require("./users.controllers");

module.exports.updateUserFirstTimeField = async (user_id) => {
  const user = await usersController.getUserById(user_id);
  const user_toUpdate = {
    ...user,
    isFirstTime: false,
  };
  await usersController.updateUser(user_toUpdate);
};
