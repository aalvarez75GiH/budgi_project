const { v4: uuidv4 } = require("uuid");

const { db } = require("../../fb");

const getAllWorkApps = async () => {
  return await db
    .collection("work_apps")
    .get()
    .then((data) => {
      let work_apps = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          if (doc.data().app_name === "Cash") {
            const selectedWorkApp = {
              app_id: doc.data().app_id,
              app_name: doc.data().app_name,
              collected_money: doc.data().collected_money,
              logo_path: doc.data().logo_path,
              icon_color: doc.data().icon_color,
            };
            work_apps.push(selectedWorkApp);
          }
          if (doc.data().app_name !== "Cash") {
            const selectedWorkApp = {
              app_id: doc.data().app_id,
              app_name: doc.data().app_name,
              collected_money: doc.data().collected_money,
              logo_path: doc.data().logo_path,
              weeks: doc.data().weeks,
              icon_color: doc.data().icon_color,
            };
            work_apps.push(selectedWorkApp);
          }
        });

        return work_apps;
      }
      if (!docs.length) {
        return work_apps;
      }
    });
  //   return work_apps;
};

// ** Create a work app
const createWorkingApp = async (working_app) => {
  //   const { category_id } = expense_category;
  const app_id = uuidv4();
  const working_appToCreate = {
    ...working_app,
    app_id,
  };
  await db
    .collection("work_apps")
    .doc(`/${app_id}/`)
    .create(working_appToCreate);
  return working_appToCreate;
};

module.exports = {
  getAllWorkApps,
  createWorkingApp,
};
