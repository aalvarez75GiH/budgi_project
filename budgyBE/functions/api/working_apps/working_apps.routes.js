const app = require("../../express")();
const workingAppsController = require("./working_apps.controllers");

//** Getting all Working Apps
app.get("/", (req, res) => {
  (async () => {
    try {
      await workingAppsController.getAllWorkApps().then((work_apps) => {
        work_apps.length
          ? res.status(200).json(work_apps)
          : res.status(404).send({
              status: "404",
              msg: "WORK APPS NOT FOUND",
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

app.post("/", (req, res) => {
  //   const category_id = uuidv4();
  //   console.log("EXPENSE CATEGORY ID:", expense_category_id);
  const working_app = {
    app_name: req.body.app_name,
    logo_path: req.body.logo_path,
    collected_money: req.body.collected_money,
    weeks: req.body.weeks,
  };

  (async () => {
    try {
      await workingAppsController
        .createWorkingApp(working_app)
        .then((work_app) => {
          console.log("WORK APP AT ROUTE", work_app);
          res.json(work_app);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// ** Just for developing purposes
app.post("/postMultipleWorkApps", (req, res) => {
  const multiple_working_apps = req.body.multiple_working_apps;
  console.log("MULTIPLE WORK APPS: ", multiple_working_apps);
  (async () => {
    multiple_working_apps.map(async (work_app) => {
      try {
        await workingAppsController
          .createWorkingApp(work_app)
          .then((work_app) => {
            console.log("WORK APP AT ROUTE", work_app);
            //   res.json(work_app);
          });
      } catch (error) {
        return res.status(500).send({
          status: "Failed",
          msg: error,
        });
      }
    });
    res.json(multiple_working_apps);
  })();
});
module.exports = app;
