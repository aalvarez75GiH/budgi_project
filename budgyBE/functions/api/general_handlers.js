const category_listController = require("../api/category_list/category_list.controllers");
const categoryDataController = require("../api/category_data/category_data.controllers");

module.exports.validation_and_update_process_of_a_new_expense_category_node =
  async (
    mandatory,
    expense_category_array,
    document_to_update,
    new_node,
    type_controller
  ) => {
    const { category_id, category_name } = new_node;
    let category_list_updated;

    if (!mandatory) {
      index = expense_category_array.findIndex(
        (obj) =>
          obj.category_id === category_id || obj.category_name === category_name
      );

      console.log("INDEX AT VALIDATION:", index);

      if (index === -1) {
        expense_category_array.push(new_node);
        if (type_controller === "category_list") {
          category_list_updated =
            await category_listController.updateCategoryList(
              document_to_update
            );
        }
        if (type_controller === "category_data") {
          await categoryDataController.updateCategoryData(document_to_update);
        }
        return {
          status: "Success",
          msg: "Expense Category added to Category List  successfully...",
          category_list_updated: category_list_updated,
        };
      }

      if (index !== -1) {
        return {
          status: "Same name or ID",
          msg: "Expense Category already exists....",
        };
      }
    }
    if (mandatory) {
      index = expense_category_array.findIndex(
        (obj) => obj.category_id === category_id
      );

      if (index === -1) {
        expense_category_array.push(new_node);
        if (type_controller === "category_list") {
          category_list_updated =
            await category_listController.updateCategoryList(
              document_to_update
            );
        }
        if (type_controller === "category_data") {
          await categoryDataController.updateCategoryData(document_to_update);
        }
        return {
          status: "Success",
          msg: "Expense Category added successfully...",
          category_list_updated: category_list_updated,
        };
      }
      if (index !== -1) {
        return {
          status: "Same name or ID",
          msg: "Expense Category already exists....",
        };
      }
    }
  };

module.exports.gettingIndexCategoryId = (array, node, category_id) => {
  let index;
  console.log("ARRAY:", array);
  console.log("NODE:", node);
  console.log("CATEGORY ID:", category_id);
  if (node.category_id === category_id) {
    index = array.findIndex((obj) => obj.category_id === category_id);
  }
  return index;
};

module.exports.roundingNumberToTwoDecimals = async (number) => {
  const numberFixedRounded = (Math.round(number * 100) / 100).toFixed(2);
  const numberFixedRoundedAndParsedToInt = parseFloat(numberFixedRounded);
  return numberFixedRoundedAndParsedToInt;
};
