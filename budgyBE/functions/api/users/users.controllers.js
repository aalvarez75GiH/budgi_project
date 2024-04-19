const { db } = require("../../fb");

// ** get All Users
const getAllUsers = async () => {
  return await db
    .collection("users")
    .get()
    .then((data) => {
      let users = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedUser = {
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
            email: doc.data().email,
            role: doc.data().role,
            uid: doc.data().uid,
            creation_date: doc.data().creation_date,
            user_id: doc.data().user_id,
            isFirstTime: doc.data().isFirstTime,
          };
          users.push(selectedUser);
        });
        return users;
      }
      if (!docs.length) {
        return users;
      }
    });
};

// ** get a user by ID
const getUserById = async (user_id) => {
  console.log("USER_ID AT CONTROLLER:", user_id);
  return await db
    .collection("users")
    .doc(user_id)
    .get()
    .then((user) => user.data());
};

// ** get a user by UID
const getUserByUId = async (uid) => {
  console.log("UID AT CONTROLLER:", uid);
  let found_user;
  await db
    .collection("users")
    .where(`uid`, "==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_user = doc.data();
      });
    });
  return found_user;
};

// ** get a user by email
const getUserByEmail = async (email) => {
  console.log("EMAIL AT CONTROLLER:", email);
  let found_user;
  await db
    .collection("users")
    .where(`email`, "==", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_user = doc.data();
      });
    });
  return found_user;
};

const getUsersByRole = async (role) => {
  let users_by_role = [];
  await db
    .collection("users")
    .where("role", "==", role)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        users_by_role.push(doc.data());
      });
    });
  return users_by_role;
};

// ** Create a user - Http Request
const createUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).create(user);
  return user;
};

// ** Updated a user - Http Request
const updateUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).update(user);
  return user;
};

const deleteUser = async (user_id) => {
  await db.collection("users").doc(`/${user_id}/`).delete();
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUId,
  createUser,
  getUsersByRole,
  updateUser,
  deleteUser,
};
