import { useContext, useState } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useAnyTransactionDetailsLogic = () => {
  // ** DATA FROM TRANSACTIONS CONTEXT ****
  const {
    fixingANumberToTwoDecimalsAndString,
    updatingTransaction,
    isLoading,
    transactionInfoForUpdate,
    setReadyToUpdate,
    readyToUpdate,
  } = useContext(TransactionsContext);
  const { amount, transaction_date, short_name, description, transaction_id } =
    transactionInfoForUpdate;
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const navigationLogic = (navigation, toNavigate, comingFrom) => {
    const movingForwardToAddDescription = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    // "General_select_category_view",
    //           "AnyTransactionDetailsView"
    const movingForwardToSelectCategoryView = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    const movingForwardToGeneralCalendarView = (
      navigation,
      toNavigate,
      comingFrom
    ) => {
      navigation.navigate(toNavigate, {
        comingFrom: comingFrom,
      });
    };
    const movingForwardToDeleteConfirmationView = (
      navigation,
      toNavigate,
      comingFrom
      //   transaction_id
    ) => {
      navigation.navigate(toNavigate, {
        document_id: transaction_id,
        comingFrom: comingFrom,
      });
    };

    const updatingTransactionProcess = async (navigation) => {
      const response = await updatingTransaction();
      setReadyToUpdate(false);
      response ? navigation.goBack() : null;
    };
    // const updatingTransactionProcess = async (navigation) => {
    //   const response = await updatingTransaction();
    //   response ? navigation.navigate("My transactions") : null;
    // };

    const closingMenu = (navigation) => {
      navigation.goBack();
    };
    return {
      movingForwardToAddDescription,
      movingForwardToSelectCategoryView,
      movingForwardToGeneralCalendarView,
      movingForwardToDeleteConfirmationView,
      updatingTransactionProcess,
      closingMenu,
    };
  };

  return {
    navigationLogic,
    stringedAmount,
    transaction_date,
    short_name,
    description,
    isLoading,
    readyToUpdate,
  };
};
